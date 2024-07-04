import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { FollowUpPrompt, FullPrompt } from '../types/gpt.types';
import util from 'util';

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  project: process.env.PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const system: ChatCompletionMessageParam = {
  role: 'system',
  content: 'You are an AI assistant specialized in providing company information.',
};

const schema = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
          },
          content: {
            type: 'string',
          },
        },
        required: ['title', 'content'],
      },
    },
  },
};

export const createChat = async (prompt: FullPrompt) => {
  try {
    const messages: ChatCompletionMessageParam[] = [
      system,
      ...prompt.data.map((prompt, index) => ({
        role: 'user' as const,
        content: `Prompt ${index + 1}: ${prompt.title}\n${prompt.prompt}`,
      })),
      {
        role: 'user',
        content: `The company is ${prompt.company} and the category is ${prompt.category}.`,
      },
      {
        role: 'user',
        content: `Please ensure you always answer all the provided prompts and that each prompt is returned as an item in the "data" array.
        The number of items in the "data" array should match the number of prompts provided.
        Return the entire response in a single JSON object under the "data" key. 
        Each object should have a "title" key with the prompt title and a "content" key with the response.
        The "content" key should always be a string.
        Feel free to add any necessary formatting to the "content" string to make it more readable.
        Ensure that any links provided are legitimate and do not lead to a 404 error. 
        If you are unable to find any information, please state so in the response.`,
      },
    ];

    const response = await openai.chat.completions.create({
      messages: [system, ...messages],
      tools: [
        { type: 'function', function: { name: 'json_schema_validation', parameters: schema } },
      ],
      model: 'gpt-4o',
    });

    const content = response?.choices[0]?.message?.tool_calls?.[0].function.arguments;

    console.log('GPT API response: ', util.inspect(content, { depth: null }));
    if (!content) {
      throw new Error('Received null content from GPT API');
    }

    const { data } = JSON.parse(content);

    // Ensure all prompts are answered
    const expectedTitles = prompt.data.map((p) => p.title);
    const filledData = expectedTitles.map((title) => {
      const existingResponse = data.find((d: { title: string }) => d.title === title);
      return existingResponse || { title, content: 'No response available.' };
    });

    return filledData;
  } catch (error) {
    console.error('Error calling GPT API: ', error);
    throw error;
  }
};

export const createFollowUp = async (prompt: FollowUpPrompt) => {
  try {
    const messages: ChatCompletionMessageParam[] = [
      system,
      {
        role: 'user' as const,
        content: prompt.data,
      },
      {
        role: 'user' as const,
        content: `The company is ${prompt.company} and the category is ${prompt.category}.`,
      },
    ];

    const response = await openai.chat.completions.create({
      messages,
      model: 'gpt-4o',
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling GPT API: ', error);
    throw error;
  }
};

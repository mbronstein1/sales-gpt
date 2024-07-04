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
            oneOf: [
              {
                type: 'string',
              },
              {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            ],
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
        content: `Please return the entire response in a single JSON object under the "data" key. 
        The value for "data" is an array of objects, where each item of the array is the response to one of the provided prompts.
        Each object should have a "title" key with the prompt title and a "content" key with the response. 
        If the content requires bullet points, return an array for the "content" key. Otherwise, return a string for the "content" key. 
        Ensure the "title" key matches the prompt title exactly.
        The "content" key should contain either a string or an array of strings.
        Do not return individual JSON objects separated by newline characters. Return a single JSON array without any extraneous formatting, comments, or newline characters that would prevent the JSON from being parsed.`,
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

    return data;
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

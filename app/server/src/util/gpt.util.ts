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

export const createChat = async (prompt: FullPrompt) => {
  try {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `Please return each full response in a single line, stringified, minified raw array with the following raw JSON format: { "title": <title>, "content": <content> }. 
        If the prompt calls for bullet points, return an array for the "content" key. Otherwise, return a string for the "content" key. 
        Ensure the title matches the prompt title exactly. 
        Return raw JSON without any extraneous formatting, comments, or newline characters that would prevent the JSON from being parsed.`,
      },
      ...prompt.data.map((prompt, index) => ({
        role: 'user' as const,
        content: `Prompt ${index + 1}: ${prompt.title}\n${prompt.prompt}`,
      })),
      {
        role: 'user',
        content: `The company is ${prompt.company} and the category is ${prompt.category}.`,
      },
    ];

    const response = await openai.chat.completions.create({
      messages,
      model: 'gpt-4',
    });

    const content = response.choices[0].message.content;

    console.log('GPT API response: ', util.inspect(content, { depth: null }));
    if (!content) {
      throw new Error('Received null content from GPT API');
    }

    const lines = content.split('\n').filter((line) => line.trim() !== '');
    const data = lines.map((line) => JSON.parse(line));

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

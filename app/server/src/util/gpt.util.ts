import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { FollowUpPrompt, FullPrompt } from '../types/gpt.types';

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
      system,
      {
        role: 'system',
        content: `Please return each full response in an array w/ the following JSON format: { "title": "<title>", "content: <content> }. 
            If the prompt calls for bullet points, return an array for the "content" key. Otherwise, return a string for the "content" key.'
            Ensure the title matches the prompt title exactly.
            For each prompt, consider the company and category provided to generate relevant responses.`,
      },
      ...prompt.data.map((prompt, index) => ({
        role: 'user' as const,
        content: `Prompt ${index + 1}: ${prompt.title}\n${prompt.prompt}`,
      })),
      {
        role: 'user' as const,
        content: `The company is ${prompt.company} and the category is ${prompt.category}.`,
      },
    ];

    const response = await openai.chat.completions.create({
      messages,
      model: 'gpt-4o',
    });

    const data = response.choices[0].message.content;

    return data ? JSON.parse(data) : [];
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

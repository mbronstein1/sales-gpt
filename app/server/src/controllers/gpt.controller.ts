import { Request, Response } from 'express';
import { createChat } from '../util/gpt.util';
import { FullPrompt, FullResponse } from '../types/gpt.types';

const validateFields = (req: Request, res: Response) => {
  if (
    !req.body.company ||
    !req.body.category ||
    !req.body.data ||
    (Array.isArray(req.body.data) && !req.body.data.length)
  ) {
    res.status(400).send('Missing required fields');
    return false;
  }
  return true;
};

export const generateResponse = async (req: Request, res: Response) => {
  if (!validateFields(req, res)) return;

  try {
    const data = await createChat(req.body as FullPrompt);
    const formattedResponse = {
      company: req.body.company,
      category: req.body.category,
      data: data.map((d: FullResponse, i: number) => ({
        ...d,
        gridCoordinates: req.body.data[i].gridCoordinates,
        color: req.body.data[i].color,
      })),
    };
    res.send(formattedResponse);
  } catch (error) {
    res.status(500).send('Error generating response');
    console.log('Error generating response: ', error);
  }
};

export const generateFollowUp = async (req: Request, res: Response) => {
  if (!validateFields(req, res)) return;

  try {
    const response = await createChat(req.body as FullPrompt);
    const formattedResponse = {
      company: req.body.company,
      category: req.body.category,
      response,
    };
    res.send(formattedResponse);
  } catch (error) {
    res.status(500).send('Error generating response');
    console.log('Error generating response: ', error);
  }
};

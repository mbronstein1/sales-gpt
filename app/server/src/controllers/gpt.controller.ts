import { Request, Response } from 'express';
import { createChat, createFollowUp } from '../util/gpt.util';
import { FollowUpPrompt, FullPrompt, FullResponse } from '../types/gpt.types';
import db from '../util/db.util';

const validateFields = (req: Request, res: Response) => {
  if (!req.body.company || !req.body.category) {
    res.status(400).send('Missing required fields');
    return false;
  }
  return true;
};

export const generateResponse = async (req: Request, res: Response) => {
  if (!validateFields(req, res)) return;
  try {
    const content = await db.findMany('content', {
      where: {
        category: req.body.category,
        companies: {
          some: {
            company: { id: req.params.companyId },
          },
        },
      },
    });

    if (!content) {
      res.status(404).send('Content for company and category not found');
      return;
    }

    const data = await createChat({ ...content[0], company: req.body.company } as FullPrompt);
    const formattedResponse = {
      company: req.body.company,
      category: req.body.category,
      data: data.map((d: FullResponse, i: number) => ({
        ...d,
        gridCoordinates: content[0].data[i].gridCoordinates,
        color: content[0].data[i].color,
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
    const response = await createFollowUp(req.body as FollowUpPrompt);
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

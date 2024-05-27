import { Request, Response } from 'express';
import db, { prisma } from '../util/db.util';
import { Prompt } from '../types/gpt.types';

export const getAllContent = async (req: Request, res: Response) => {
  const content = await db.findMany('content');

  if (!content) {
    return res.status(404).send('Content not found');
  }

  res.status(200).json(content);
};

export const getContentById = async (req: Request, res: Response) => {
  const { contentId } = req.params;
  const content = await db.findOne('content', { where: { id: contentId } });

  if (!content) {
    return res.status(404).send('Content not found');
  }

  res.status(200).json(content);
};

export const getAllContentByCompanyId = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const content = await db.findMany('content', {
    where: {
      companies: {
        some: {
          company: { id: companyId },
        },
      },
    },
    orderBy: { category: 'asc' },
  });

  if (!content) {
    return res.status(404).send('Content not found');
  }

  res.status(200).json(content);
};

export const getContentByCompanyId = async (req: Request, res: Response) => {
  const { companyId, contentId } = req.params;
  const content = await db.findOne('content', {
    where: {
      id: contentId,
      companies: {
        some: {
          company: { id: companyId },
        },
      },
    },
  });

  if (!content) {
    return res.status(404).send('Content not found');
  }

  res.status(200).json(content);
};

export const createContent = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const newContent = await prisma.$transaction(async (prisma: any) => {
    const content = await db.create(req.body, 'content', prisma);
    if (!content) throw new Error('Error creating content');

    const companyContentLink = await db.create(
      {
        company: {
          connect: {
            id: companyId,
          },
        },
        content: {
          connect: {
            id: content.id,
          },
        },
      },
      'companyContent',
      prisma
    );

    if (!companyContentLink) throw new Error('Error creating company content');

    return content;
  });

  res.status(201).json(newContent);
};

export const updateContent = async (req: Request, res: Response) => {
  const { companyId, contentId } = req.params;
  try {
    await prisma.$transaction(async (prisma: any) => {
      const content = await db.findOne(
        'content',
        {
          where: { id: contentId },
        },
        prisma
      );

      if (!content) throw new Error('Company content not found');

      // if content is shared, create a new content and update the company content link
      if (content.isShared) {
        // merge content and req.body including data array objects
        const mergedData = content.data.map((data: Prompt, index: number) => {
          return { ...data, ...req.body.data[index] };
        });

        const newContent = await db.create(
          { category: content.category, data: mergedData, isShared: false },
          'content',
          prisma
        );

        if (!newContent) throw new Error('Error creating new content');

        console.log('newContent', newContent);

        const response = await db.update(
          { contentId: newContent.id },
          'companyContent',
          { where: { companyId_contentId: { companyId, contentId } } },
          prisma
        );

        if (!response) throw new Error('Error updating company content link');
      } else {
        // otherwise, update the content
        await db.update(req.body, 'content', { where: { id: contentId } }, prisma);
      }
    });

    res.status(200).json('Content updated successfully');
  } catch (err) {
    res.status(500).send('Error updating content');
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  const { contentId } = req.params;
  await db.delete('content', { where: { id: contentId } });
  res.status(204).send('Content deleted successfully');
};

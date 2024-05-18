import { Request, Response } from 'express';
import db from '../util/db.util';
import prisma from '../util/db.util';

const selectOptions = {
  id: true,
  first_name: true,
  last_name: true,
  email: true,
};

export const createUser = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const newUser = await db.create({ ...req.body, company: { connect: companyId } }, 'user');
  res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await db.findMany('user');
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await db.findOne('id', userId, 'user');
  res.status(200).json(user);
};

export const getUsersByCompanyId = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const users = await (prisma as any).user.findMany({
    where: { companyId },
    include: { company: true },
    select: selectOptions,
  });
  res.status(200).json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updatedUser = await db.update(userId, req.body, 'user');
  res.status(200).json(updatedUser);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await db.delete(userId, 'user');
  res.status(204).send();
};
import { Request, Response } from 'express';
import db from '../util/db.util';

export const getAllCompanies = async (req: Request, res: Response) => {
  const companies = await db.findMany('company');
  res.status(200).json(companies);
};

export const getCompanyById = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const company = await db.findOne('company', { where: { id: companyId } });
  res.status(200).json(company);
};

export const updateCompany = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  const updatedCompany = await db.update(req.body, 'company', { where: { id: companyId } });
  res.status(200).json('Company updated');
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { companyId } = req.params;
  await db.delete('company', { where: { id: companyId } });
  res.status(204).send('Company deleted');
};

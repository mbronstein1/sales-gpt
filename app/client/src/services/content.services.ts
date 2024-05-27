import { get, post, put, del } from '../helpers/api_helpers';
import {
  CreateContentArgs,
  GetAllContentArgs,
  GetContentByIdArgs,
  UpdateContentArgs,
} from '../types/content.types';

export const getAllContent = async ({ companyId }: GetAllContentArgs, config = {}) => {
  return await get(`/content/all/${companyId}`, config);
};

export const getContentById = async ({ companyId, contentId }: GetContentByIdArgs, config = {}) => {
  return await get(`/content/${companyId}/${contentId}`, config);
};

export const createContent = async ({ companyId, data }: CreateContentArgs, config = {}) => {
  return await post(`/content/${companyId}`, data, config);
};

export const updateContent = async (
  { companyId, contentId, data }: UpdateContentArgs,
  config = {}
) => {
  return await put(`/content/${companyId}/${contentId}`, data, config);
};

export const deleteContent = async ({ companyId, contentId }: GetContentByIdArgs, config = {}) => {
  return await del(`/content/${companyId}/${contentId}`, config);
};

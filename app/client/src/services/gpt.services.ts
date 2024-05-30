import { post } from '../helpers/api_helpers';
import { FollowUpGPTPrompt, ICreateFullGPTPrompt } from '../types/gpt.types';

export const generateGptResponse = async (
  companyId: string,
  data: ICreateFullGPTPrompt,
  config = {}
) => {
  return await post(`/gpt/generate/${companyId}`, data, config);
};

export const generateGptFollowUp = async (
  companyId: string,
  category: string,
  data: FollowUpGPTPrompt,
  config = {}
) => {
  return await post(`/gpt/generate/${companyId}/${category}/follow-up`, data, config);
};

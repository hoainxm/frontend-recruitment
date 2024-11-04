import { ApiResponse, doGet, doPost } from '../../common/utils/baseAPI';
import { Job } from './model';
/** @format */

const jobsAPIUrl = 'api/v1/jobs';

export const getAllJobs = (): Promise<ApiResponse<Job[]>> => {
  return doGet(`${jobsAPIUrl}/getAllJobs`);
};

export const fetchJobById = (jobId: string): Promise<ApiResponse<Job>> => {
  return doGet(`${jobsAPIUrl}/${jobId}`);
};

export const fetchJobBySkill = (skills: string[]): Promise<ApiResponse<Job[]>> => {
  return doPost(`${jobsAPIUrl}/fetchJobBySkills`, { skills });
};

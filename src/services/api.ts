import axios from 'axios';
import type { ResumeAnalysis } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function uploadResume(
  file: File,
  jobDescription: string,
  onProgress?: (progress: number) => void
): Promise<ResumeAnalysis> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('job_description', jobDescription);

  const response = await axios.post<ResumeAnalysis>(
    `${API_BASE_URL}/resume/upload`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    }
  );

  return response.data;
}

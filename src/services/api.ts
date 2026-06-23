import axios, { isAxiosError } from 'axios';
import type { ResumeAnalysis } from '../types';

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

  if (!configuredUrl) {
    throw new Error('VITE_API_URL is not set. Add it to your .env file.');
  }

  // In dev, use Vite proxy (/api) to avoid CORS — proxy target comes from VITE_API_URL
  if (import.meta.env.DEV) {
    return '/api';
  }

  return configuredUrl;
}

const API_BASE_URL = getApiBaseUrl();

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 502 || status === 503 || status === 504) {
      return (
        'Backend unavailable (502). Start the API with ' +
        'uvicorn main:app --reload --port 8000 and ensure ' +
        'VITE_API_URL=http://localhost:8000 in the frontend .env.'
      );
    }

    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. The analysis can take up to 2 minutes — please try again.';
    }

    const detail = error.response?.data?.detail;

    if (typeof detail === 'string') {
      return detail;
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Failed to analyze resume. Please try again.';
}

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
      timeout: 120000,
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

import { Part, NewPart } from '../types';

const API_BASE_URL = 'https://api.sheetninja.io/c61a8d5f43e14d28b1a83c75d0e7325d/parts/parts';

export const fetchParts = async (): Promise<Part[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch parts');
  }
  const result = await response.json();
  return Array.isArray(result.data) ? result.data : [];
};

export const createPart = async (part: NewPart): Promise<Part> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(part),
  });
  if (!response.ok) {
    throw new Error('Failed to create part');
  }
  return response.json();
};

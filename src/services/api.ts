import { Part, NewPart } from '../types';

const API_BASE_URL = 'https://api.sheetninja.io/c61a8d5f43e14d28b1a83c75d0e7325d/parts/parts';

export const fetchParts = async (): Promise<Part[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch parts');
  }

  const result = await response.json();
  const rows = Array.isArray(result.data) ? result.data : [];

  return rows.map((row: any) => ({
    id: row.id,
    partName: row.part_name ?? row.partName ?? '',
    category: row.category ?? '',
    price: Number(row.price) || 0,
    condition: row.condition ?? '',
    location: row.location ?? '',
    description: row.description ?? '',
    contactName: row.contact_name ?? row.contactName ?? '',
    createdAt: row.created_at ?? row.createdAt ?? '',
  }));
};

export const createPart = async (part: NewPart): Promise<Part> => {
  const payload = {
    part_name: part.partName,
    category: part.category,
    price: Number(part.price),
    condition: part.condition,
    location: part.location,
    description: part.description,
    contact_name: part.contactName,
    created_at: new Date().toISOString(),
  };

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Failed to create part');
  }

  return {
    id: Date.now(),
    partName: payload.part_name,
    category: payload.category,
    price: payload.price,
    condition: payload.condition,
    location: payload.location,
    description: payload.description,
    contactName: payload.contact_name,
    createdAt: payload.created_at,
  };
};
};

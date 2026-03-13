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
    throw new Error('Failed to create part');
  }

  return response.json();
};
Why this fixes it

Sheet headers:

part_name
category
price
condition
location
description
contact_name
created_at

Payload must match exactly.

Right now it doesn’t.

After you change it

Click Commit changes in GitHub

Wait for Vercel to redeploy

Refresh your live site

Submit a new part

It should now:

appear in Google Sheets

appear in the app

return in GET

If it still doesn't show in UI

Then next fix will be in types, but try this first — this is the main bug.

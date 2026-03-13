export interface Part {
  id: string;
  partName: string;
  category: string;
  price: string;
  condition: string;
  location: string;
  description: string;
  contactName: string;
  createdAt: string;
}

export interface NewPart {
  partName: string;
  category: string;
  price: string;
  condition: string;
  location: string;
  description: string;
  contactName: string;
}

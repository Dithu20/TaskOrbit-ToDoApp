// src/types.ts
export type Task = {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  ownerId?: string;
  createdAt?: string;
};

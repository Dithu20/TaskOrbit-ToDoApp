// Example of how your Task interface might look in types.ts

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  status: 'active' | 'completed';
  createdAt: string | number;
  ownerId: string;
  
  dueDate?: string | null; 
}
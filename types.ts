


export interface Task {
  id?: string;
  ownerId: string;

  title: string;
  description?: string;

  status: "active" | "completed" | "archived";  // REQUIRED
  priority?: "low" | "medium" | "high";         // OPTIONAL
  category?: string;                            // OPTIONAL

  createdAt?: string;
}
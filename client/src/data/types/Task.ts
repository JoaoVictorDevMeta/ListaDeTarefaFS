export interface Category {
  id: number;
  userId: number;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  description: string;
  notes: string | null;
  status: boolean;
  nextDate: string;
  nextInterval: number | null;
  days: string | null;
  repeatTimes: number | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  Category: Category; // Include the Category object
}
export type Task = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  color?: string | null;
  colorBorder?: string | null; 
  completed: boolean;
};
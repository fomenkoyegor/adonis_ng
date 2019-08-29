export interface Task {
  id?: number;
  project_id: number;
  description: string;
  complited?: boolean;
  created_at?: string;
  updated_at?: string;
}

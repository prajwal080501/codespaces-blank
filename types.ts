export interface Task {
  id: string;
  userId: string;
  title: string;
  status: string;
  priority: string;
  dueDate?: Date;
}

export interface TaskObject {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate?: Date;
}

export type TaskObjectData = TaskObject;
export type TasksData = Task[];


export type CsvFile = {
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  date?: string;
  userId?: string;
}


export type User = {
  clerkUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}
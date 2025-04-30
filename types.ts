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
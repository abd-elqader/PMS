// src/Interfaces/task.ts
 type  Manager = {
  userName: string;
}
 type Employee = {
  userName: string;
};
 type Project = {
    title: string;
    manager: Manager
  };

export interface Task {
  id: number;
  title: string;
  status: string;
  project: Project;
  employee: Employee;
  description: string;
  creationDate: string;
}

export interface TaskResponse {
  data: Task[];
  totalTasks: number;
  totalPages: number;
  totalNumberOfRecords: number;
}

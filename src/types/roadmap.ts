export interface Task {
  dev: string;
  description: string;
}

export interface Sprint {
  sprint: string;
  goals: string[];
  tasks: Task[];
  risks: string[];
}

export interface Roadmap {
  month1: Sprint[];
  month2: Sprint[];
  month3: Sprint[];
}

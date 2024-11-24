export interface Todo {
  title: string;
  difficulty: string;
  date?: Date;
  tags: string[];
}

export enum HabiticaTaskDifficulty {
  Trivial = 0.1,
  Easy = 1,
  Medium = 1.5,
  Hard = 2,
}

export interface Preferences {
  language: string;
}

export type Task = {
  id: string;
  text: string;
  date: string | null;
  tags: string[];
  type: "todo";
};

// remove this type and just use tasks
export type HabiticaItems = {
  tasks: Task[];
};

export type GetTagResponse = {
  success: boolean;
  data: Tag;
};

export type Tag = {
  name: string;
  id: string;
};

export type GetAllTagsResponse = {
  success: boolean;
  data: Tag[];
};

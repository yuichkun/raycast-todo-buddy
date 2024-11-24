export interface Todo {
  title: string;
  difficulty: string;
  date?: Date;
  tags: string[];
}

export interface Preferences {
  language: string;
}

export type Task = {
  id: string;
  text: string;
  date: string | null;
  tags: string[];
};

export type Tag = {
  name: string;
  id: string;
};

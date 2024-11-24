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
  difficulty: string;
  date: string | undefined;
  tags: string[];
};

export type Tag = {
  name: string;
  id: string;
};

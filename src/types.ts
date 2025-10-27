export interface Preferences {
  language: string;
}

export type Task = {
  id: string;
  text: string;
  difficulty: string;
  date: string | undefined;
  tags: string[];
  completed: boolean;
} & (
  | { pinned: false }
  | { pinned: true; pinnedAt: string }
);

export type Tag = {
  name: string;
  id: string;
};

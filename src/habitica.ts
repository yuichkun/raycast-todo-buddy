import { HabiticaItems } from "./types";

type CreateTaskArgs = {
  text: string;
  difficulty: string;
  date?: string;
  tags?: string[];
};
export function createTask({ text, difficulty, date, tags }: CreateTaskArgs) {
  // TODO: implement
  console.log("createTask", text, difficulty, date, tags);
}

export async function retrieveAllItems(): Promise<HabiticaItems> {
  // TODO: implement
  console.log("retrieveAllItems");
  return {
    tasks: [],
    dailys: [],
  };
}

export async function completeTask(taskId: string) {
  // TODO: implement
  console.log("completeTask", taskId);
}

export async function deleteTask(taskId: string) {
  // TODO: implement
  console.log("deleteTask", taskId);
}

export async function renameTask(taskId: string, text: string) {
  // TODO: implement
  console.log("renameTask", taskId, text);
}

export async function updateDueDate(taskId: string, date: Date | null) {
  // TODO: implement
  console.log("updateDueDate", taskId, date);
}

export async function getAllTags() {
  // TODO: implement
  console.log("getAllTags");
  return [];
}

export async function updateTags(taskId: string, tags: string[]) {
  // TODO: implement
  console.log("updateTags", taskId, tags);
}

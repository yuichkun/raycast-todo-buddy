import { createTaskInStorage, deleteTaskInStorage, getAllTasks } from "./repository/localStorage";
import { v4 as uuidv4 } from "uuid";
import { Tag, Task } from "./types";

type CreateTaskArgs = {
  text: string;
  difficulty: string;
  date?: string;
  tags?: string[];
};
export function createTask({ text, difficulty, date, tags }: CreateTaskArgs) {
  console.log("createTask", text, difficulty, date, tags);
  return createTaskInStorage({ id: uuidv4(), text, difficulty, date, tags: tags ?? [] });
}

export async function retrieveAllItems(): Promise<Task[]> {
  console.log("retrieveAllItems");
  return getAllTasks();
}

export async function completeTask(taskId: string) {
  // TODO: implement
  console.log("completeTask", taskId);
}

export async function deleteTask(taskId: string) {
  console.log("deleteTask", taskId);
  return deleteTaskInStorage(taskId);
}

export async function renameTask(taskId: string, text: string) {
  // TODO: implement
  console.log("renameTask", taskId, text);
}

export async function updateDueDate(taskId: string, date: Date | null) {
  // TODO: implement
  console.log("updateDueDate", taskId, date);
}

export async function getAllTags(): Promise<Tag[]> {
  // TODO: implement
  console.log("getAllTags");
  return [];
}

export async function updateTags(taskId: string, tags: string[]) {
  // TODO: implement
  console.log("updateTags", taskId, tags);
}

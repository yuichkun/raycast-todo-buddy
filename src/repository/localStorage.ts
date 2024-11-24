import { LocalStorage } from "@raycast/api";
import { Task } from "../types";

export async function getAllTasks(): Promise<Task[]> {
  const rawTasks = await LocalStorage.getItem<string>("tasks");
  return JSON.parse(rawTasks ?? "[]");
}

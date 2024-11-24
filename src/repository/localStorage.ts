import { LocalStorage } from "@raycast/api";
import { Task } from "../types";

export async function getAllTasks(): Promise<Task[]> {
  const rawTasks = await LocalStorage.getItem<string>("tasks");
  const tasks = JSON.parse(rawTasks ?? "[]");
  console.log("allTasks", tasks);
  return tasks;
}

export async function createTaskInStorage(task: Task) {
  const tasks = await getAllTasks();
  tasks.push(task);
  await LocalStorage.setItem("tasks", JSON.stringify(tasks));
}
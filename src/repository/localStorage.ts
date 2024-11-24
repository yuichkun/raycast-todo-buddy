import { LocalStorage } from "@raycast/api";
import { Tag, Task } from "../types";

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

export async function deleteTaskInStorage(taskId: string) {
  const tasks = await getAllTasks();
  const filteredTasks = tasks.filter((task) => task.id !== taskId);
  await LocalStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

export async function renameTaskInStorage(taskId: string, text: string) {
  const tasks = await getAllTasks();
  const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, text } : task));
  await LocalStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

export async function updateDueDateInStorage(taskId: string, date: string | undefined) {
  const tasks = await getAllTasks();
  const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, date } : task));
  await LocalStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

export async function getAllTagsInStorage(): Promise<Tag[]> {
  const rawTags = await LocalStorage.getItem<string>("tags");
  const tags = JSON.parse(rawTags ?? "[]");
  return tags;
}

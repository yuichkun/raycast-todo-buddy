import {
  changeTagsOfATaskInStorage,
  toggleTaskCompletionInStorage,
  createTagInStorage,
  createTaskInStorage,
  deleteTaskInStorage,
  getAllTagsInStorage,
  getAllTasks,
  renameTaskInStorage,
  updateDueDateInStorage,
  changeDifficultyOfATaskInStorage,
  updateTaskInStorage,
  deleteTagInStorage,
  renameTagInStorage,
  setPinTaskInStorage,
} from "./repository/localStorage";
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
  return createTaskInStorage({
    id: uuidv4(),
    text,
    difficulty,
    date,
    tags: tags ?? [],
    completed: false,
    pinned: false,
  });
}

export async function updateTask(taskId: string, newTask: Omit<Task, "id">) {
  console.log("updateTask", taskId, newTask);
  return updateTaskInStorage(taskId, newTask);
}

export async function retrieveAllItems(): Promise<Task[]> {
  console.log("retrieveAllItems");
  return getAllTasks();
}

export async function toggleTaskCompletionStatus(taskId: string) {
  console.log("toggleTaskCompletionStatus", taskId);
  return toggleTaskCompletionInStorage(taskId);
}

export async function deleteTask(taskId: string) {
  console.log("deleteTask", taskId);
  return deleteTaskInStorage(taskId);
}

export async function renameTask(taskId: string, text: string) {
  console.log("renameTask", taskId, text);
  return renameTaskInStorage(taskId, text);
}

export async function updateDueDate(taskId: string, date: Date | undefined) {
  console.log("updateDueDate", taskId, date);
  return updateDueDateInStorage(taskId, date?.toLocaleString());
}

export async function getAllTags(): Promise<Tag[]> {
  console.log("getAllTags");
  return getAllTagsInStorage();
}

export async function createTag(tag: Tag) {
  console.log("createTag", tag);
  return createTagInStorage(tag);
}

export async function renameTag(tagId: string, name: string) {
  console.log("renameTag", tagId, name);
  return renameTagInStorage(tagId, name);
}

export async function updateTags(taskId: string, tags: string[]) {
  console.log("updateTags", taskId, tags);
  return changeTagsOfATaskInStorage(taskId, tags);
}

export async function deleteTag(tagId: string) {
  // If the tag is used by any task, don't delete it
  const tasks = await getAllTasks();
  const isUsed = tasks.some((task) => task.tags.includes(tagId));
  if (isUsed) {
    const tagName = (await getAllTags()).find((tag) => tag.id === tagId)?.name;
    throw new Error(`Tag ${tagName} is used by one or more tasks`);
  }
  console.log("deleteTag", tagId);
  return deleteTagInStorage(tagId);
}

export async function updateLevel(taskId: string, level: string) {
  console.log("updateLevel", taskId, level);
  return changeDifficultyOfATaskInStorage(taskId, level);
}

export async function pinTask(taskId: string) {
  console.log("pinTask", taskId);
  return setPinTaskInStorage(taskId, true);
}

export async function unpinTask(taskId: string) {
  console.log("unpinTask", taskId);
  return setPinTaskInStorage(taskId, false);
}

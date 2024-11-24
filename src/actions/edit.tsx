import { Action, ActionPanel, Icon, showToast, Toast } from "@raycast/api";
import { FC } from "react";
import { getConfig } from "../config";
import { toggleTaskCompletionStatus, deleteTask, updateDueDate } from "../storage";
import { playSound } from "../sound";
import { Task } from "../types";
import { ChangeTags } from "./ChangeTags";
import { ChangeLevel } from "./ChangeLevel";
import { RenameTask } from "./RenameTask";
type Props = {
  item: Task;
  refetchList: () => void;
};

export const TaskEditMenu: FC<Props> = ({ item, refetchList }) => {
  const { language } = getConfig();
  const handleComplete = async (task: Task) => {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Completing Task...",
      message: task.text,
    });
    try {
      await toggleTaskCompletionStatus(task.id);
      toast.style = Toast.Style.Success;
      if (task.completed) {
        toast.title = "Marked Task as Incomplete";
        refetchList();
      } else {
        toast.title = "Marked Task as Complete";
        refetchList();
        await playSound("todo.mp3");
      }
    } catch (e) {
      toast.title = "Failed:";
      if (e instanceof Error) {
        toast.message = e.message;
      }
      throw e;
    }
  };
  const handleUpdateDate = async (task: Task, date: Date | undefined) => {
    try {
      await showToast({
        title: "Updating Task Due Date",
        message: `by ${date?.toLocaleDateString(language) ?? "No Date"}`,
      });
      await updateDueDate(task.id, date);
      refetchList();
    } catch (e) {
      if (e instanceof Error) {
        await showToast({ title: "Failed:", message: e.message });
      }
      throw e;
    }
  };
  const handleDelete = async (task: Task) => {
    try {
      await showToast({
        title: "Deleting the task",
        message: task.text,
      });
      await deleteTask(task.id);
      refetchList();
    } catch (e) {
      if (e instanceof Error) {
        await showToast({ title: "Failed:", message: e.message });
      }
      throw e;
    }
  };
  return (
    <ActionPanel.Submenu title="Edit">
      <Action
        title={item.completed ? "Mark as Incomplete" : "Mark as Complete"}
        icon={item.completed ? Icon.Circle : Icon.CheckCircle}
        shortcut={{
          key: "c",
          modifiers: ["cmd", "shift"],
        }}
        onAction={() => handleComplete(item)}
      />
      <Action.PickDate
        title="Set Date"
        shortcut={{
          key: "d",
          modifiers: ["cmd", "shift"],
        }}
        onChange={(date) => {
          handleUpdateDate(item, date ?? undefined);
        }}
      />
      <Action.Push
        title="Rename Task"
        icon={Icon.Pencil}
        shortcut={{
          key: "r",
          modifiers: ["cmd", "shift"],
        }}
        target={<RenameTask item={item} refetchList={refetchList} />}
      />
      <Action.Push
        title="Change Tags"
        icon={Icon.Tag}
        shortcut={{
          key: "t",
          modifiers: ["cmd", "shift"],
        }}
        target={<ChangeTags item={item} refetchList={refetchList} />}
      />
      <Action.Push
        title="Change Level"
        icon={Icon.Stars}
        shortcut={{
          key: "l",
          modifiers: ["cmd", "shift"],
        }}
        target={<ChangeLevel item={item} refetchList={refetchList} />}
      />
      <Action
        title="Delete Task"
        icon={Icon.DeleteDocument}
        shortcut={{
          key: "delete",
          modifiers: ["cmd", "shift"],
        }}
        onAction={() => handleDelete(item)}
      />
    </ActionPanel.Submenu>
  );
};

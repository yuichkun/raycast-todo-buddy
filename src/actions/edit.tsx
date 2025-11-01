import { Action, ActionPanel, Icon, showToast, Toast } from "@raycast/api";
import { FC } from "react";
import { getConfig } from "../config";
import { playSound } from "../sound";
import { deleteTask, pinTask, toggleTaskCompletionStatus, unpinTask, updateDueDate } from "../storage";
import { Task } from "../types";
import { ChangeLevel } from "./ChangeLevel";
import { ChangeTags } from "./ChangeTags";
import { MultipleEdit } from "./MultipleEdit";
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
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Deleting the task",
      message: task.text,
    });
    try {
      toast.style = Toast.Style.Success;
      toast.title = "Deleted the task";
      await deleteTask(task.id);
      refetchList();
    } catch (e) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed:";
      if (e instanceof Error) {
        toast.message = e.message;
      }
      throw e;
    }
  };
  const handlePin = async (task: Task) => {
    if (task.pinned) {
      await unpinTask(task.id);
    } else {
      await pinTask(task.id);
    }
    refetchList();
  };
  return (
    <ActionPanel.Submenu title="Edit">
      <Action.Push
        title="Edit Task"
        icon={Icon.Document}
        shortcut={{
          macOS: { modifiers: ["cmd", "shift"], key: "e" },
          windows: { modifiers: ["ctrl", "shift"], key: "e" },
        }}
        target={<MultipleEdit oldTask={item} refetchList={refetchList} />}
      />
      <Action
        title={item.completed ? "Mark as Incomplete" : "Mark as Complete"}
        icon={item.completed ? Icon.Circle : Icon.CheckCircle}
        shortcut={{
          macOS: { modifiers: ["cmd", "shift"], key: "c" },
          windows: { modifiers: ["ctrl", "shift"], key: "c" },
        }}
        onAction={() => handleComplete(item)}
      />
      <Action
        title={item.pinned ? "Unpin Task" : "Pin Task"}
        icon={item.pinned ? Icon.TackDisabled : Icon.Tack}
        shortcut={{
          macOS: { modifiers: ["cmd", "shift"], key: "p" },
          windows: { modifiers: ["ctrl", "shift"], key: "p" },
        }}
        onAction={() => handlePin(item)}
      />
      <Action.PickDate
        title="Set Date"
        shortcut={{
          macOS: { modifiers: ["cmd", "shift"], key: "d" },
          windows: { modifiers: ["ctrl", "shift"], key: "d" },
        }}
        onChange={(date) => {
          handleUpdateDate(item, date ?? undefined);
        }}
      />
      <Action.Push
        title="Rename Task"
        icon={Icon.Pencil}
        shortcut={{
          macOS: { modifiers: ["cmd", "shift"], key: "r" },
          windows: { modifiers: ["ctrl", "shift"], key: "r" },
        }}
        target={<RenameTask item={item} refetchList={refetchList} />}
      />
      <Action.Push
        title="Change Tags"
        icon={Icon.Tag}
        shortcut={{
          macOS: { modifiers: ["cmd", "shift"], key: "t" },
          windows: { modifiers: ["ctrl", "shift"], key: "t" },
        }}
        target={<ChangeTags item={item} refetchList={refetchList} />}
      />
      <Action.Push
        title="Change Level"
        icon={Icon.Stars}
        shortcut={{
          macOS: { modifiers: ["cmd", "shift"], key: "l" },
          windows: { modifiers: ["ctrl", "shift"], key: "l" },
        }}
        target={<ChangeLevel item={item} refetchList={refetchList} />}
      />
      <Action
        title="Delete Task"
        icon={Icon.DeleteDocument}
        style={Action.Style.Destructive}
        shortcut={{
          macOS: { modifiers: ["cmd", "shift"], key: "delete" },
          windows: { modifiers: ["ctrl", "shift"], key: "delete" },
        }}
        onAction={() => handleDelete(item)}
      />
    </ActionPanel.Submenu>
  );
};

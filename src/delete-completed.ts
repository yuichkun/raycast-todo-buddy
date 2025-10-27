import { Alert, confirmAlert, showToast, Toast } from "@raycast/api";
import { deleteCompletedTasks, retrieveAllItems } from "./storage";

export default async function Command() {
  const tasks = await retrieveAllItems();
  const completedTasks = tasks.filter((task) => task.completed);
  const completedCount = completedTasks.length;

  if (completedCount === 0) {
    await showToast({
      style: Toast.Style.Success,
      title: "Nothing to Delete",
      message: "There are no completed tasks.",
    });
    return;
  }

  const confirmed = await confirmAlert({
    title: "Delete Completed Tasks",
    message: `Delete ${completedCount} completed ${completedCount === 1 ? "task" : "tasks"}?`,
    primaryAction: {
      title: "Delete",
      style: Alert.ActionStyle.Destructive,
    },
    dismissAction: {
      title: "Cancel",
    },
  });

  if (!confirmed) {
    await showToast({
      style: Toast.Style.Success,
      title: "Cancelled",
      message: "Completed tasks were not deleted.",
    });
    return;
  }

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: "Deleting Completed Tasks",
    message: `${completedCount} ${completedCount === 1 ? "task" : "tasks"}`,
  });

  try {
    const deletedCount = await deleteCompletedTasks();
    toast.style = Toast.Style.Success;
    toast.title = "Deleted Completed Tasks";
    toast.message = `${deletedCount} ${deletedCount === 1 ? "task" : "tasks"} removed`;
  } catch (error) {
    toast.style = Toast.Style.Failure;
    toast.title = "Failed to Delete";
    if (error instanceof Error) {
      toast.message = error.message;
    }
  }
}

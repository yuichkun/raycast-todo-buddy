import { Action, ActionPanel, Form, showToast, useNavigation } from "@raycast/api";
import { FC } from "react";
import { renameTask } from "../storage";
import { HabiticaTask } from "../types";

type RenameTaskProps = {
  item: HabiticaTask;
  refetchList: () => void;
};
export const RenameTask: FC<RenameTaskProps> = ({ item: item, refetchList }) => {
  const { pop } = useNavigation();

  const handleSubmit = async ({ newName }: { newName: string }) => {
    try {
      await showToast({
        title: "Renaming a task",
        message: newName,
      });
      await renameTask(item.id, newName);
      refetchList();
      pop();
    } catch (e) {
      if (e instanceof Error) {
        await showToast({ title: "Failed:", message: e.message });
      }
      throw e;
    }
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Rename Task" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField defaultValue={item.text} id="newName" title="Task Name" />
    </Form>
  );
};

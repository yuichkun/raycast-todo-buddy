import { Action, ActionPanel, Form, Icon, showToast, Toast, useNavigation } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { FC } from "react";
import ListTasks from "./list-tasks";
import { createTask, getAllTags } from "./storage";
import { Tag, Task } from "./types";

export default function Command() {
  const { isLoading, data } = useCachedPromise(getAllTags, [], {
    initialData: [],
  });
  const { push } = useNavigation();
  async function handleCreate(task: Task) {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Creating a new Task...",
      message: task.text,
    });
    try {
      const localDateString = task.date ? new Date(task.date).toLocaleString() : undefined;
      await createTask({
        text: task.text,
        difficulty: task.difficulty,
        date: localDateString,
        tags: task.tags,
      });
      toast.style = Toast.Style.Success;
      toast.title = "Created a new Task";
      push(<ListTasks />);
    } catch (e) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to create a new Task";
      if (e instanceof Error) {
        toast.message = e.message;
      }
    }
  }

  return (
    <>
      <CreateTodoForm onCreate={handleCreate} tags={data} isLoading={isLoading} />
    </>
  );
}

type Props = {
  isLoading: boolean;
  tags: Tag[];
  onCreate: (todo: Task) => void;
};

const CreateTodoForm: FC<Props> = ({ onCreate, tags, isLoading }) => {
  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Todo" onSubmit={onCreate} />
        </ActionPanel>
      }
    >
      <Form.TextField id="text" title="Task Name" />
      <Form.DatePicker id="date" title="Date" />
      <Form.TagPicker id="tags" title="Tags">
        {tags.map((tag) => (
          <Form.TagPicker.Item key={tag.id} value={tag.id} title={tag.name} />
        ))}
      </Form.TagPicker>
      <Form.Dropdown id="difficulty" title="Difficulty" defaultValue="Easy">
        <Form.Dropdown.Item value="Trivial" title="Trivial" icon={Icon.Stars} />
        <Form.Dropdown.Item value="Easy" title="Easy" icon={Icon.Stars} />
        <Form.Dropdown.Item value="Medium" title="Medium" icon={Icon.Stars} />
        <Form.Dropdown.Item value="Hard" title="Hard" icon={Icon.Stars} />
      </Form.Dropdown>
    </Form>
  );
};

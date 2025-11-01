import { Action, ActionPanel, Grid, Icon, showToast, Toast } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { nameToColor } from "./nameToColor";
import { deleteTag, getAllTags } from "./storage";
import { Tag } from "./types";
import { RenameTag } from "./RenameTag";
import ListTasks from "./list-tasks";

export default function Command() {
  const { data: tags, revalidate } = useCachedPromise(getAllTags, [], {
    initialData: [],
  });
  const handleDelete = async (tag: Tag) => {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Deleting Tag...",
      message: tag.name,
    });
    try {
      await deleteTag(tag.id);
      toast.style = Toast.Style.Success;
      toast.title = "Deleted Tag";
      revalidate();
    } catch (e) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed:";
      if (e instanceof Error) {
        toast.message = e.message;
      }
    }
  };
  return (
    <Grid>
      {tags.map((tag) => (
        <Grid.Item
          key={tag.id}
          content={{
            value: {
              color: nameToColor(tag.name),
            },
            tooltip: tag.name,
          }}
          title={tag.name}
          actions={
            <ActionPanel>
              <ActionPanel.Submenu title="Edit">
                <Action.Push
                  title="Rename Tag"
                  icon={Icon.Pencil}
                  shortcut={{
                    macOS: { modifiers: ["cmd", "shift"], key: "r" },
                    windows: { modifiers: ["ctrl", "shift"], key: "r" },
                  }}
                  target={<RenameTag tag={tag} revalidate={revalidate} />}
                />
                <Action.Push
                  title="Show Tasks"
                  icon={Icon.List}
                  shortcut={{
                    macOS: { modifiers: ["cmd", "shift"], key: "s" },
                    windows: { modifiers: ["ctrl", "shift"], key: "s" },
                  }}
                  target={<ListTasks initialSearchText={tag.name} />}
                />
                <Action
                  title="Delete Tag"
                  icon={Icon.DeleteDocument}
                  style={Action.Style.Destructive}
                  shortcut={{
                    macOS: { modifiers: ["cmd", "shift"], key: "delete" },
                    windows: { modifiers: ["ctrl", "shift"], key: "delete" },
                  }}
                  onAction={() => handleDelete(tag)}
                />
              </ActionPanel.Submenu>
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}

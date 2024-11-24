import { Action, ActionPanel, Grid, Icon, showToast, Toast } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { nameToColor } from "./nameToColor";
import { deleteTag, getAllTags } from "./storage";
import { Tag } from "./types";

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
                <Action
                  title="Delete Tag"
                  icon={Icon.DeleteDocument}
                  style={Action.Style.Destructive}
                  shortcut={{
                    key: "delete",
                    modifiers: ["cmd", "shift"],
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

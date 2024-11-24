import { List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { getAllTags } from "./storage";

export default function Command() {
  const { data: tags } = useCachedPromise(getAllTags, [], {
    initialData: [],
  });
  return (
    <List>
      {tags.map((tag) => (
        <List.Item key={tag.id} title={tag.name} />
      ))}
    </List>
  );
}

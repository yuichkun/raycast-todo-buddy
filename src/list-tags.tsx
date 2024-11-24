import { Grid } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { nameToColor } from "./nameToColor";
import { getAllTags } from "./storage";

export default function Command() {
  const { data: tags } = useCachedPromise(getAllTags, [], {
    initialData: [],
  });
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
        />
      ))}
    </Grid>
  );
}

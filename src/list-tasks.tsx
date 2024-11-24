import { Icon, List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useMemo, useState } from "react";
import { sortByDate, sortByLevel } from "./date";
import { useSearch } from "./hooks/useSearch";
import { getAllTags, retrieveAllItems } from "./storage";
import { TaskLineItem } from "./TaskLineItem";
import { Tag, Task } from "./types";
type SortOrder = "dueDate" | "level";
type Props = {
  initialSearchText?: string;
};
const Command = ({ initialSearchText }: Props) => {
  const initialData = useMemo(() => {
    return [] as Task[];
  }, []);

  const {
    isLoading: isAllItemLoading,
    data: unfilteredItem,
    revalidate: refetchList,
  } = useCachedPromise(retrieveAllItems, [], {
    initialData,
  });
  const { isLoading: isAllTagLoading, data: allTags } = useCachedPromise(getAllTags, [], {
    initialData: [] as Tag[],
  });

  const { searchText, setSearchText, filteredItems } = useSearch(unfilteredItem, allTags, initialSearchText);

  const incompleteTasks = filteredItems.filter((task) => !task.completed);
  const completeTasks = filteredItems.filter((task) => task.completed);

  const [sortOrder, setSortOrder] = useState<SortOrder>("dueDate");
  const sortMethod = sortOrder === "dueDate" ? sortByDate : sortByLevel;

  return (
    <List
      isLoading={isAllItemLoading || isAllTagLoading}
      searchBarPlaceholder="Search by anything. Task title, tags, date, etc."
      searchText={searchText}
      onSearchTextChange={setSearchText}
      searchBarAccessory={
        <List.Dropdown tooltip="Select sort order" onChange={(v: string) => setSortOrder(v as SortOrder)}>
          <List.Dropdown.Section>
            <List.Dropdown.Item title="Due date" value="dueDate" icon={Icon.Calendar} />
            <List.Dropdown.Item title="Level" value="level" icon={Icon.Cloud} />
          </List.Dropdown.Section>
        </List.Dropdown>
      }
    >
      <List.Section title="Incomplete" subtitle={`${incompleteTasks.length} tasks`}>
        {incompleteTasks.sort(sortMethod).map((task) => (
          <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
        ))}
      </List.Section>
      <List.Section title="Done" subtitle={`${completeTasks.length} tasks`}>
        {completeTasks.sort(sortMethod).map((task) => (
          <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
        ))}
      </List.Section>
    </List>
  );
};

export default Command;

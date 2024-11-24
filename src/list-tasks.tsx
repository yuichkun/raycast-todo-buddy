import { List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useMemo } from "react";
import { sortByDate } from "./date";
import { useSearch } from "./hooks/useSearch";
import { getAllTags, retrieveAllItems } from "./storage";
import { TaskLineItem } from "./TaskLineItem";
import { Tag, Task } from "./types";

const Command = () => {
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

  const { searchText, setSearchText, filteredItems } = useSearch(unfilteredItem, allTags);

  const incompleteTasks = filteredItems.filter((task) => !task.completed);
  const completeTasks = filteredItems.filter((task) => task.completed);

  return (
    <List
      isLoading={isAllItemLoading || isAllTagLoading}
      searchBarPlaceholder="Search by anything. Task title, tags, date, etc."
      searchText={searchText}
      onSearchTextChange={setSearchText}
    >
      <List.Section title="Incomplete" subtitle={`${incompleteTasks.length} tasks`}>
        {incompleteTasks.sort(sortByDate).map((task) => (
          <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
        ))}
      </List.Section>
      <List.Section title="Done" subtitle={`${completeTasks.length} tasks`}>
        {completeTasks.sort(sortByDate).map((task) => (
          <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
        ))}
      </List.Section>
    </List>
  );
};

export default Command;

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

  return (
    <List
      isLoading={isAllItemLoading || isAllTagLoading}
      searchBarPlaceholder="Search by anything. Task title, tags, date, etc."
      searchText={searchText}
      onSearchTextChange={setSearchText}
    >
      {filteredItems.sort(sortByDate).map((task) => (
        <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
      ))}
    </List>
  );
};

export default Command;

import { List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useMemo } from "react";
import { sortByDate } from "./date";
import { getAllTags, retrieveAllItems } from "./habitica";
import { useSearch } from "./hooks/useSearch";
import { TaskLineItem } from "./TaskLineItem";
import { HabiticaItems, Tag } from "./types";

const Command = () => {
  const initialData = useMemo(() => {
    return {
      tasks: [],
    } as HabiticaItems;
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
      {filteredItems.tasks.sort(sortByDate).map((task) => (
        <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
      ))}
    </List>
  );
};

export default Command;

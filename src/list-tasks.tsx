import { Icon, List } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useMemo, useState } from "react";
import { isPastDue, sortByDate, sortByLevel } from "./date";
import { useSearch } from "./hooks/useSearch";
import { getAllTags, retrieveAllItems } from "./storage";
import { TaskLineItem } from "./TaskLineItem";
import { Tag, Task } from "./types";
type SortOrder = "dueDate" | "level";
type Props = {
  initialSearchText?: string;
};

function categorizeTasks(tasks: Task[]) {
  const categorizedTasks = {
    outdatedTasks: [] as Task[],
    pinnedTasks: [] as Task[],
    incompleteTasks: [] as Task[],
    completeTasks: [] as Task[],
  };

  for (const task of tasks) {
    switch (true) {
      case task.completed:
        categorizedTasks.completeTasks.push(task);
        break;
      case isPastDue(task.date):
        categorizedTasks.outdatedTasks.push(task);
        break;
      case task.pinned:
        categorizedTasks.pinnedTasks.push(task);
        break;
      default:
        categorizedTasks.incompleteTasks.push(task);
        break;
    }
  }

  return categorizedTasks;
}
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

  const { outdatedTasks, pinnedTasks, incompleteTasks, completeTasks } = categorizeTasks(filteredItems);
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
      <List.Section title="⚠️ Outdated" subtitle={`${outdatedTasks.length} tasks`}>
        {outdatedTasks.sort(sortMethod).map((task) => (
          <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
        ))}
      </List.Section>
      <List.Section title="📌Pinned" subtitle={`${pinnedTasks.length} tasks`}>
        {pinnedTasks.sort(sortMethod).map((task) => (
          <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
        ))}
      </List.Section>
      <List.Section title="📝Incomplete" subtitle={`${incompleteTasks.length} tasks`}>
        {incompleteTasks.sort(sortMethod).map((task) => (
          <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
        ))}
      </List.Section>
      <List.Section title="✅Done" subtitle={`${completeTasks.length} tasks`}>
        {completeTasks.sort(sortMethod).map((task) => (
          <TaskLineItem key={task.id} task={task} refetchList={refetchList} allTags={allTags} />
        ))}
      </List.Section>
    </List>
  );
};

export default Command;

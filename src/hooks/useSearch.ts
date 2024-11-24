import { useEffect, useState } from "react";
import { searchItems } from "../search";
import { Tag, Task } from "../types";

export function useSearch(unfilteredItems: Task[], allTags: Tag[]) {
  const [searchText, setSearchText] = useState("today");
  const [filteredItems, setFilteredItems] = useState<Task[]>(unfilteredItems);
  useEffect(() => {
    if (searchText === "") {
      setFilteredItems(unfilteredItems);
      return;
    }
    const tasks = searchItems(unfilteredItems, allTags, searchText);
    setFilteredItems(tasks);
  }, [searchText, unfilteredItems]);
  return {
    searchText,
    setSearchText,
    filteredItems,
  };
}

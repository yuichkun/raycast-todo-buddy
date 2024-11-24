import { useEffect, useState } from "react";
import { searchItems } from "../search";
import { HabiticaItems, Tag } from "../types";

export function useSearch(unfilteredItems: HabiticaItems, allTags: Tag[]) {
  const [searchText, setSearchText] = useState("today");
  const [filteredItems, setFilteredItems] = useState<HabiticaItems>(unfilteredItems);
  useEffect(() => {
    if (searchText === "") {
      setFilteredItems(unfilteredItems);
      return;
    }
    const tasks = searchItems(unfilteredItems.tasks, allTags, searchText);
    setFilteredItems({
      tasks,
    });
  }, [searchText, unfilteredItems]);
  return {
    searchText,
    setSearchText,
    filteredItems,
  };
}

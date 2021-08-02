import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "src/utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen: React.VFC = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const debouncedParam = useDebounce(param, 2000);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};

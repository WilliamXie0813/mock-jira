import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen: React.VFC = () => {
	const [param, setParam] = useState<any>({ name: "", personId: null });
	const [list, setList] = useState<any[]>([]);
	const [users, setUsers] = useState<any[]>([]);
	const debouncedParam = useDebounce(param, 200);
	const client = useHttp();

	useEffect(() => {
		client("projects", { data: cleanObject(debouncedParam) }).then(setList);
	}, [debouncedParam]);

	useMount(() => {
		client("users").then(setUsers);
	});

	return (
		<div>
			<SearchPanel users={users} param={param} setParam={setParam} />
			<List list={list} users={users} />
		</div>
	);
};

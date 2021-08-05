import React, { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

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
		<Container>
			<SearchPanel users={users} param={param} setParam={setParam} />
			<List users={users} />
		</Container>
	);
};

const Container = styled.div`
	padding: 3.2rem;
`;

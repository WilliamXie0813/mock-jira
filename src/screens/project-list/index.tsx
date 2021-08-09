import React, { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Project } from "types/project";
import { useQueryParam } from "utils/url";

export const ProjectListScreen: React.VFC = () => {
	const [param, setParam] = useQueryParam(["name", "personId"]);
	const debouncedParam = useDebounce(param, 200);
	const { isLoading, data } = useProjects(debouncedParam);
	const { data: users } = useUsers();
	useDocumentTitle("项目列表");

	return (
		<Container>
			<h1>项目列表</h1>
			<SearchPanel users={users || []} param={param} setParam={setParam} />
			<List users={users || []} dataSource={data || []} loading={isLoading} />
		</Container>
	);
};

// (ProjectListScreen as any).whyDidYouRender = true;

const Container = styled.div`
	padding: 3.2rem;
	width: 100%;
`;

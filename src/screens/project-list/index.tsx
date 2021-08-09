import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectSearchParams } from "./util";

export const ProjectListScreen: React.VFC = () => {
	useDocumentTitle("项目列表");
	const [param, setParam] = useProjectSearchParams();
	const { isLoading, data: list, retry } = useProjects(useDebounce(param, 200));
	const { data: users } = useUsers();

	return (
		<Container>
			<h1>项目列表</h1>
			<SearchPanel users={users || []} param={param} setParam={setParam} />
			<List
				refresh={retry}
				users={users || []}
				dataSource={list || []}
				loading={isLoading}
			/>
		</Container>
	);
};

// (ProjectListScreen as any).whyDidYouRender = true;

const Container = styled.div`
	padding: 3.2rem;
	width: 100%;
`;

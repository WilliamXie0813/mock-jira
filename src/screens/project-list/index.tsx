import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectSearchParams } from "./util";
import { Row } from "components/lib";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

export const ProjectListScreen = () => {
	useDocumentTitle("项目列表");
	const dispatch = useDispatch();
	const [param, setParam] = useProjectSearchParams();
	const { isLoading, data: list, retry } = useProjects(useDebounce(param, 200));
	const { data: users } = useUsers();

	return (
		<Container>
			<Row between={true}>
				<h1>项目列表</h1>
				<Button
					onClick={() => {
						dispatch(projectListActions.openProjectModal());
					}}
				>
					创建项目
				</Button>
			</Row>

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

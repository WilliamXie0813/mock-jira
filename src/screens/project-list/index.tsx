import React, { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Project } from "types/project";

export const ProjectListScreen: React.VFC = () => {
	const [param, setParam] = useState<
		Partial<Pick<Project, "name" | "personId">>
	>({ name: "", personId: "" });
	const debouncedParam = useDebounce(param, 200);
	const { isLoading, data } = useProjects(debouncedParam);
	const { data: users } = useUsers();

	return (
		<Container>
			<SearchPanel users={users || []} param={param} setParam={setParam} />
			<List users={users || []} dataSource={data || []} loading={isLoading} />
		</Container>
	);
};

const Container = styled.div`
	padding: 3.2rem;
`;

import styled from "@emotion/styled";
import { Popover, Typography, List, Divider, Button } from "antd";
import React from "react";
import { useProjects } from "utils/project";

export const PojectPopover = (props: {
	setProjectModalOpen: (flag: boolean) => void;
}) => {
	const { setProjectModalOpen } = props;
	const { data: projects, isLoading } = useProjects();
	const pinnedProjects = projects?.filter((project) => project.pin);

	const content = (
		<ContentContainer>
			<Typography.Text type="secondary">收藏项目</Typography.Text>
			<List>
				{pinnedProjects?.map((project) => (
					<List.Item>
						<List.Item.Meta title={project.name} />
					</List.Item>
				))}
			</List>
			<Divider />
			<Button
				style={{ padding: 0 }}
				type="link"
				onClick={() => {
					setProjectModalOpen(true);
				}}
			>
				创建项目
			</Button>
		</ContentContainer>
	);

	return (
		<Popover placement="bottom" content={content}>
			<span>项目</span>
		</Popover>
	);
};

const ContentContainer = styled.div`
	min-width: 30rem;
`;
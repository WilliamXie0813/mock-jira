import React from "react";
import { User } from "types/user";
import { Project } from "types/project";
import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectQueryKey } from "./util";

interface ListProps extends TableProps<Project> {
	users: User[];
	refresh?: () => void;
}

export const List: React.VFC<ListProps> = ({
	users,
	refresh,
	...tableProps
}) => {
	const { mutate } = useEditProject(useProjectQueryKey());
	const { startEdit } = useProjectModal();

	function pinProject(id: number) {
		return function (pin: boolean) {
			mutate({ id, pin });
		};
	}

	function edit(id: number) {
		startEdit(id);
	}

	return (
		<Table
			pagination={false}
			columns={[
				{
					title: <Pin checked={true} disabled={true} />,
					render(value, project) {
						return (
							<Pin
								checked={project.pin}
								onCheckedChange={pinProject(project.id)}
							/>
						);
					},
				},
				{
					title: "名称",
					sorter: (a, b) => a.name.localeCompare(b.name),
					render(value, project) {
						return <Link to={String(project.id)}>{project.name}</Link>;
					},
				},
				{
					title: "部门",
					dataIndex: "organization",
				},
				{
					title: "负责人",
					render(value, project) {
						return (
							<span>
								{users.find((user) => user.id === project.personId)?.name ||
									"未知"}
							</span>
						);
					},
				},
				{
					title: "创建时间",
					render(value, project) {
						return (
							<span>
								{project.created
									? dayjs(project.created).format("YYYY-MM-DD")
									: ""}
							</span>
						);
					},
				},
				{
					title: "",
					render(value, project) {
						return <More project={project} />;
					},
				},
			]}
			{...tableProps}
		/>
	);
};

const More = ({ project }: { project: Project }) => {
	const { startEdit } = useProjectModal();

	const editProject = (id: number) => () => startEdit(id);

	const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());

	const confirmDeleteProject = (id: number) => {
		Modal.confirm({
			title: "确定删除这个项目吗?",
			content: "点击确定删除",
			okText: "确定",
			onOk() {
				deleteProject(id);
			},
		});
	};
	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item onClick={editProject(project.id)} key={"edit"}>
						编辑
					</Menu.Item>
					<Menu.Item
						onClick={() => confirmDeleteProject(project.id)}
						key={"delete"}
					>
						删除
					</Menu.Item>
				</Menu>
			}
		>
			<ButtonNoPadding type={"link"}>...</ButtonNoPadding>
		</Dropdown>
	);
};

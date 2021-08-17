import React from "react";
import { User } from "types/user";
import { Project } from "types/project";
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";

interface ListProps extends TableProps<Project> {
	users: User[];
	refresh?: () => void;
}

export const List: React.VFC<ListProps> = ({
	users,
	refresh,
	...tableProps
}) => {
	const { mutate } = useEditProject();
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
						return (
							<Dropdown
								overlay={
									<Menu>
										<Menu.Item key="edit">
											<ButtonNoPadding
												type="link"
												onClick={() => {
													edit(project.id);
												}}
											>
												编辑
											</ButtonNoPadding>
										</Menu.Item>
										<Menu.Item key="delete">
											<ButtonNoPadding
												type="link"
												onClick={() => {
													edit(project.id);
												}}
											>
												删除
											</ButtonNoPadding>
										</Menu.Item>
									</Menu>
								}
							>
								<ButtonNoPadding type="link">...</ButtonNoPadding>
							</Dropdown>
						);
					},
				},
			]}
			{...tableProps}
		/>
	);
};

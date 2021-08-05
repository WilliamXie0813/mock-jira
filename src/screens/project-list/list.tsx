import React from "react";
import { User } from "types/user";
import { Project } from "types/project";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";

interface ListProps extends TableProps<Project> {
	users: User[];
}

export const List: React.VFC<ListProps> = (props) => {
	const { users } = props;

	return (
		<Table
			pagination={false}
			columns={[
				{
					title: "名称",
					sorter: (a, b) => a.name.localeCompare(b.name),
					render(value, project) {
						return <span>{project.name}</span>;
						// return <Link to={String(project.id)}>{project.name}</Link>;
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
			]}
			dataSource={[] as Project[]}
		/>
	);
};

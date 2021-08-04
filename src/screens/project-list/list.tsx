import React from "react";
import { User } from "types/user";
import { Project } from "types/project";
import { Table, TableProps } from "antd";

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
			]}
			dataSource={[] as Project[]}
		/>
		// <table>
		//   <thead>
		//     <tr>
		//       <th>名称</th>
		//       <th>负责人</th>
		//     </tr>
		//   </thead>
		//   <tbody>
		//     {list.map((project: Project) => (
		//       <tr key={project.id}>
		//         <td>{project.name}</td>
		//         <td>
		//           {users.find((user: User) => user.id === project.personId)?.name ??
		//             "未知"}
		//         </td>
		//       </tr>
		//     ))}
		//   </tbody>
		// </table>
	);
};

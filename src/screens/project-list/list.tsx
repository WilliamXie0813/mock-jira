import React from "react";
import { User } from "types/user";
import { Project } from "types/project";

export const List: React.VFC<any> = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project: Project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user: User) => user.id === project.personId)?.name ??
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

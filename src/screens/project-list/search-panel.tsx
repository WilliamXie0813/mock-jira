import React, { ChangeEvent } from "react";
import { Project } from "types/project";
import { User } from "types/user";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel: React.VFC<SearchPanelProps> = ({
  users,
  param,
  setParam,
}) => {
  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setParam({ ...param, name: e.target.value });
  }

  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    setParam({ ...param, personId: e.target.value as any });
  }

  return (
    <form>
      <input type="text" value={param.name} onChange={onInputChange} />
      <select value={param.personId} onChange={onSelectChange}>
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};

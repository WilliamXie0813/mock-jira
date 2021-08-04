import { Input, Select } from "antd";
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

	function onSelectChange(val: string) {
		setParam({ ...param, personId: +val });
	}

	return (
		<form>
			<Input type="text" value={param.name} onChange={onInputChange} />
			<Select
				defaultValue={`${param.personId ?? ""}`}
				onChange={onSelectChange}
			>
				<Select.Option value="">负责人</Select.Option>
				{users.map((user) => (
					<Select.Option key={user.id} value={user.id}>
						{user.name}
					</Select.Option>
				))}
			</Select>
		</form>
	);
};

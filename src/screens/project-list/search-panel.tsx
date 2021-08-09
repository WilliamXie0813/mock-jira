import { Form, Input, Select } from "antd";
import { IdSelect } from "components/id-select";
import { UserSelect } from "components/user-select";
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

	function onSelectChange(val: number | undefined) {
		setParam({ ...param, personId: +(val || 0) });
	}

	return (
		<Form style={{ marginBottom: "2rem" }} layout="inline">
			<Form.Item>
				<Input
					type="text"
					value={param.name}
					onChange={onInputChange}
					placeholder="项目名"
				/>
			</Form.Item>
			<Form.Item>
				<UserSelect
					value={param.personId}
					onChange={onSelectChange}
					defaultOptionName="负责人"
				/>
			</Form.Item>
		</Form>
	);
};

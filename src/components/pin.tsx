import { Rate } from "antd";
import React from "react";

interface IPinProps extends React.ComponentProps<typeof Rate> {
	checked: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

export const Pin = (props: IPinProps) => {
	const { checked, onCheckedChange, ...restProps } = props;

	return (
		<Rate
			count={1}
			value={checked ? 1 : 0}
			onChange={(num) => onCheckedChange?.(!!num)}
			{...restProps}
		/>
	);
};

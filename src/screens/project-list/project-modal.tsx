import { Button, Drawer } from "antd";
import React from "react";

export const ProjectModal = (props: {
	projectModalOpen: boolean;
	onClose: () => void;
}) => {
	const { projectModalOpen, onClose } = props;

	return (
		<Drawer width="100%" visible={projectModalOpen} onClose={onClose}>
			<h1>Project Modal</h1>
			<Button onClick={onClose}> close</Button>
		</Drawer>
	);
};

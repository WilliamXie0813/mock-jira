import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { Button, Dropdown, Menu } from "antd";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { useState } from "react";
import { ProjectModal } from "screens/project-list/project-modal";
import { PojectPopover } from "components/project-popover";

export const AuthenticatedApp: React.VFC = () => {
	return (
		<BrowserRouter>
			<Container>
				<PageHeader />
				<Main>
					{/* <ProjectListScreen /> */}
					<Routes>
						<Route path="/projects" element={<ProjectListScreen />} />
						<Route path="/projects/:projectId/*" element={<ProjectScreen />} />
						<Navigate to={"/projects"} />
					</Routes>
				</Main>
				<ProjectModal />
			</Container>
		</BrowserRouter>
	);
};

const PageHeader = () => {
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<Button type="link" onClick={resetRoute} style={{ padding: 0 }}>
					<SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
				</Button>
				<PojectPopover />
				<span>用户</span>
			</HeaderLeft>
			<HeaderRight>
				<User />
			</HeaderRight>
		</Header>
	);
};

const User = () => {
	const { logout, user } = useAuth();

	return (
		<Dropdown
			overlay={
				<Menu>
					<Menu.Item key="logout">
						<Button type="link" onClick={logout}>
							登出
						</Button>
					</Menu.Item>
				</Menu>
			}
		>
			<Button type={"link"} onClick={(e) => e.preventDefault()}>
				Hi, {user?.name}
			</Button>
		</Dropdown>
	);
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem 1fr;
	height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
	padding: 3.2rem;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
	z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
	display: flex;
	overflow: hidden;
`;

import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp: React.VFC = () => {
	const [isRegister, setIsRegister] = useState(false);

	function onClick() {
		setIsRegister(!isRegister);
	}

	return (
		<div>
			{isRegister ? (
				<RegisterScreen></RegisterScreen>
			) : (
				<LoginScreen></LoginScreen>
			)}
			<button onClick={onClick}>{isRegister ? "登录" : "注册"}</button>
		</div>
	);
};

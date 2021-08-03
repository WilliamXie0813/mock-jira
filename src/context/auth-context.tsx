import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "types/user";

interface AuthForm {
	username: string;
	password: string;
}

const AuthContext = React.createContext<
	| {
			user: User | null;
			register: (form: AuthForm) => Promise<void>;
			login: (form: AuthForm) => Promise<void>;
			logout: () => Promise<void>;
	  }
	| undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// const {
	// 	data: user,
	// 	error,
	// 	isLoading,
	// 	isIdle,
	// 	isError,
	// 	run,
	// 	setData: setUser,
	// } = useAsync<User | null>();
	// const queryClient = useQueryClient();
	const [user, setUser] = useState<User | null>(null);
	// point free
	const login = (form: AuthForm) => auth.login(form).then(setUser);
	const register = (form: AuthForm) => auth.register(form).then(setUser);
	const logout = () =>
		auth.logout().then(() => {
			setUser(null);
			// queryClient.clear();
		});

	// useMount(() => {
	//   run(bootstrapUser());
	// });

	// if (isIdle || isLoading) {
	//   return <FullPageLoading />;
	// }

	// if (isError) {
	//   return <FullPageErrorFallback error={error} />;
	// }

	return (
		<AuthContext.Provider
			children={children}
			value={{ user, login, register, logout }}
		/>
	);
};

export const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth必须在AuthProvider中使用");
	}
	return context;
};

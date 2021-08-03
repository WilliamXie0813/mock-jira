import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";

export const AppProviders: React.FC = (props) => {
	return <AuthProvider>{props.children}</AuthProvider>;
};

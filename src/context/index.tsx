import React from "react";
import { AuthProvider } from "context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "store";

export const AppProviders: React.FC = (props) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>{props.children}</AuthProvider>
			</QueryClientProvider>
		</Provider>
	);
};

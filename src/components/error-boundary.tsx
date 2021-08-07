import React, { ReactNode } from "react";

interface IErrorBoundaryProps {
	fallbackRender: (props: { error: Error | null }) => React.ReactElement;
}

export class ErrorBoundary extends React.Component<
	React.PropsWithChildren<IErrorBoundaryProps>,
	{ error: Error | null }
> {
	state = { error: null };

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	render() {
		const { error } = this.state;
		const { fallbackRender, children } = this.props;

		if (error) {
			return fallbackRender({ error });
		} else {
			return children;
		}
	}
}

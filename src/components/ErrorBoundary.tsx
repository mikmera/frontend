import Alert from '@mui/material/Alert'
import React, { PropsWithChildren } from 'react'

export class ErrorBoundary extends React.Component<PropsWithChildren, { error?: Error }> {
	constructor(props: PropsWithChildren<object>) {
		super(props)

		this.state = {}
	}

	render(): React.ReactNode {
		return this.state.error ? (
			<Alert severity="error">{this.state.error.message}</Alert>
		) : (
			<>{this.props.children}</>
		)
	}

	componentDidCatch(error: Error): void {
		this.setState({
			error
		})
	}
}

export function wrapError<T>(Component: React.ComponentType<T>) {
	return ((props: T) => {
		return (
			<ErrorBoundary>
				{}
				<Component {...(props as any)} />
			</ErrorBoundary>
		)
	}) as React.FC<T>
}

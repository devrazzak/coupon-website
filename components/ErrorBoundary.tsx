import React from 'react';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="max-w-md w-full space-y-4 p-6 bg-white rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold text-red-600">
                                Something went wrong
                            </h2>
                            <p className="text-gray-600">
                                {this.state.error?.message ||
                                    'An unexpected error occurred'}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Reload page
                            </button>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

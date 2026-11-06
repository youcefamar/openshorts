import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('OpenShorts ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (_) { /* ignore */ }
    window.location.href = '/#app';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper text-ink2 flex items-center justify-center p-6">
          <div className="card max-w-lg w-full p-6 text-center space-y-4">
            <h1 className="font-display text-2xl text-ink">Something went wrong</h1>
            <p className="text-sm text-muted">
              An unexpected error occurred while loading OpenShorts.
            </p>
            {this.state.error && (
              <pre className="text-left bg-paper2 p-3 rounded text-xs text-ink2 overflow-auto max-h-40 border border-rule">
                {String(this.state.error.message || this.state.error)}
              </pre>
            )}
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="btn-primary px-4 py-2 text-sm"
              >
                Reload
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="btn-ghost px-4 py-2 text-sm"
              >
                Reset &amp; Clear Cache
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

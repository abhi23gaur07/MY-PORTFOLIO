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
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#06080d] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-2xl font-mono mb-4">
            AG.
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Something went wrong</h1>
          <p className="text-sm font-mono text-neutral-400 max-w-md mb-6">
            A temporary component error occurred. Click below to reload the engineering experience.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

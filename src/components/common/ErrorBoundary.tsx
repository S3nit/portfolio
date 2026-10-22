/**
 * ErrorBoundary Component
 * Catches unhandled rendering errors and renders a friendly Gizmo recovery view
 * instead of a blank page.
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { GizmoAvatar } from '../gizmo/GizmoAvatar';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error in Workshop App:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public handleResetHome = () => {
    window.location.href = window.location.origin + window.location.pathname + '#/';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#F5EDE2] text-[#184E46]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-[#A7D7B7] text-center space-y-5">
            <GizmoAvatar mode="thinking" size="lg" className="mx-auto" />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B45309]">
                Workshop Calibrating
              </span>
              <h2 className="text-2xl font-black text-[#184E46] mt-1">
                Gizmo is adjusting the workbench!
              </h2>
              <p className="text-xs text-[#486962] mt-2 leading-relaxed">
                An unexpected component glitch occurred. Let's reset the workbench to keep exploring.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 bg-red-50 rounded-2xl border border-red-200 text-left text-[11px] text-red-700 font-mono overflow-x-auto max-h-24">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={this.handleResetHome}
                className="px-5 py-2.5 rounded-full bg-[#184E46] text-white text-xs font-bold hover:bg-[#123B35] shadow"
              >
                Return to Workshop Home
              </button>
              <button
                onClick={this.handleReload}
                className="px-4 py-2.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

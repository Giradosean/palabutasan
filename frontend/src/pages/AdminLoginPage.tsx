import React, { useState } from 'react';
import { PageRoute } from '../types';
import { api } from '../api';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter your staff username and password.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await api.adminLogin(username.trim(), password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[82vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 bg-[#FAFAF7]">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Public Site */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#777777] hover:text-[#111111] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Studio</span>
        </button>

        {/* Login Card */}
        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-8 sm:p-10 shadow-xs space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#A63D40] bg-[#A63D40]/8 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A63D40]" />
                <span>Studio Portal Access</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#111111] flex items-center justify-center text-[#FAFAF7]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="8" />
                  <line x1="4" y1="12" x2="20" y2="12" stroke="#A63D40" strokeWidth="2.5" />
                  <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
                </svg>
              </div>
            </div>

            <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight pt-1">
              Staff Sign In
            </h1>
            <p className="text-xs text-[#777777] leading-relaxed">
              Authenticate with your Palabutasan staff or administrator account to manage appointments, services, time slots, and client inquiries.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-username"
                className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
              >
                Staff Username or Email
              </label>
              <div className="relative">
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or staff@palabutasan.ph"
                  className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl px-4 py-3 pl-10 text-sm text-[#111111] placeholder:text-[#777777]/50 focus:border-[#111111] focus:bg-white outline-hidden transition-colors"
                />
                <User className="w-4 h-4 text-[#777777] absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-[#111111]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl px-4 py-3 pl-10 pr-10 text-sm text-[#111111] placeholder:text-[#777777]/50 focus:border-[#111111] focus:bg-white outline-hidden transition-colors"
                />
                <Lock className="w-4 h-4 text-[#777777] absolute left-3.5 top-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#777777] hover:text-[#111111] p-0.5 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#111111] hover:bg-[#A63D40] text-white font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl transition-colors duration-200 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isLoading ? 'Authenticating...' : 'Enter Studio Dashboard'}
            </button>
          </form>

          {/* Footer Note */}
          <div className="pt-4 border-t border-[#E9E9E7] flex items-center justify-between text-[11px] text-[#777777]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A63D40]" />
              <span>Authorized Personnel Only</span>
            </span>
            <span className="font-mono">Token Auth · DRF</span>
          </div>
        </div>
      </div>
    </div>
  );
};


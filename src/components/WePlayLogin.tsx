import React, { useState } from 'react';
import { UserProfile } from '../types';
import { CheckCircle2, ShieldCheck, Gamepad2, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

interface WePlayLoginProps {
  onLoginSuccess: (user: UserProfile) => void;
  defaultEmail?: string;
}

const SAMPLE_GOOGLE_ACCOUNTS = [
  {
    email: 'jiteshdevsingha09@gmail.com',
    name: 'Jitesh Dev Singha',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=jitesh&backgroundColor=c084fc',
  },
  {
    email: 'weplay.gamer@gmail.com',
    name: 'WePlay Elite Player',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=weplay&backgroundColor=818cf8',
  },
];

export const WePlayLogin: React.FC<WePlayLoginProps> = ({
  onLoginSuccess,
  defaultEmail = 'jiteshdevsingha09@gmail.com',
}) => {
  // Google sign in state
  const [googleConnected, setGoogleConnected] = useState<boolean>(false);
  const [googleEmail, setGoogleEmail] = useState<string>(defaultEmail);
  const [googleName, setGoogleName] = useState<string>('Jitesh Dev Singha');
  const [googleAvatar, setGoogleAvatar] = useState<string>(
    'https://api.dicebear.com/7.x/bottts/svg?seed=jitesh&backgroundColor=c084fc'
  );
  const [showGoogleChooser, setShowGoogleChooser] = useState<boolean>(false);
  const [customEmailInput, setCustomEmailInput] = useState<string>('');

  // WePlay ID state - Only ask for ID, no verification or name lookup
  const [weplayId, setWeplayId] = useState<string>('28491048');
  const [showIdGuide, setShowIdGuide] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGoogleConnect = (email: string, name: string, avatar: string) => {
    setGoogleEmail(email);
    setGoogleName(name);
    setGoogleAvatar(avatar);
    setGoogleConnected(true);
    setShowGoogleChooser(false);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmailInput || !customEmailInput.includes('@')) {
      return;
    }
    const namePart = customEmailInput.split('@')[0];
    const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    handleGoogleConnect(
      customEmailInput.trim(),
      capitalized,
      `https://api.dicebear.com/7.x/bottts/svg?seed=${customEmailInput}&backgroundColor=c084fc`
    );
  };

  const handleIdChange = (value: string) => {
    // Only allow numeric digits for the ID
    const sanitized = value.replace(/[^0-9]/g, '');
    setWeplayId(sanitized);
    if (sanitized.length >= 3) {
      setErrorMessage('');
    }
  };

  const handleEnterApplication = () => {
    if (!googleConnected) {
      setErrorMessage('Please sign in with Google first.');
      return;
    }
    if (!weplayId || weplayId.trim().length === 0) {
      setErrorMessage('Please enter your WePlay ID to continue.');
      return;
    }

    onLoginSuccess({
      googleEmail,
      googleName,
      googleAvatar,
      weplayId: weplayId.trim(),
      isLoggedIn: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[350px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top brand bar */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/IMG_20261027_025101_778f2a22.jpg"
            alt="WePlay App Logo"
            className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-cyan-500/20 border border-cyan-400/40"
          />
          <div>
            <span className="font-display font-extrabold text-lg tracking-tight text-white uppercase">
              WEPLAY
            </span>
            <span className="text-xs text-purple-400 font-semibold tracking-wider ml-1.5 uppercase">
              RECHARGE
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Coin Recharge Portal</span>
        </div>
      </header>

      {/* Main Login Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 z-10">
        <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-purple-950/40 relative backdrop-blur-xl">
          {/* Header banner graphic */}
          <div className="relative mb-6 rounded-2xl overflow-hidden border border-purple-500/20 bg-gradient-to-r from-purple-900/60 to-indigo-950/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>DIRECT COIN RECHARGE</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  WEPLAY LOGIN
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                  Sign in with Google and enter your WePlay ID to view recharge packages.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2.5 shrink-0 ml-4">
                <img
                  src="/assets/aistudio/IMG_20261027_025101_778f2a22.jpg"
                  alt="WePlay App Logo"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/30"
                />
                <img
                  src="/src/assets/images/weplay_coin_chest_1793048260183.jpg"
                  alt="WePlay Coins"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-2xl object-cover border border-purple-400/30 shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-6">
            {/* Step 1: Google Login */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <label className="text-sm font-semibold text-slate-200">
                    Google Sign In
                  </label>
                </div>
                {googleConnected ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Connected
                  </span>
                ) : (
                  <span className="text-xs text-amber-400 font-medium">Required</span>
                )}
              </div>

              {!googleConnected ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowGoogleChooser(true)}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold px-4 py-3 rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer"
                  >
                    {/* Official Google SVG icon */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Link your Google account to authorize your recharge order.
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={googleAvatar}
                      alt={googleName}
                      className="w-10 h-10 rounded-full border border-purple-500/40 bg-purple-900/30 object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight">
                        {googleName}
                      </div>
                      <div className="text-xs text-slate-400 font-mono truncate max-w-[220px]">
                        {googleEmail}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGoogleChooser(true)}
                    className="text-xs text-purple-400 hover:text-purple-300 underline font-medium px-2 py-1 cursor-pointer"
                  >
                    Switch
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Only ask for WePlay ID */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <label htmlFor="weplay-id-input" className="text-sm font-semibold text-slate-200">
                    WePlay ID
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIdGuide(!showIdGuide)}
                  className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Where to find ID?</span>
                </button>
              </div>

              {showIdGuide && (
                <div className="mb-3 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200">
                  <div className="font-semibold text-purple-300 mb-1">How to find your WePlay ID:</div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300">
                    <li>Open the <strong>WePlay</strong> app on your device.</li>
                    <li>Tap the <strong>Profile</strong> tab at the bottom right.</li>
                    <li>Enter the numeric ID shown beneath your profile picture.</li>
                  </ol>
                </div>
              )}

              <div>
                <input
                  id="weplay-id-input"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter your WePlay ID"
                  value={weplayId}
                  onChange={(e) => handleIdChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white rounded-xl px-4 py-3 text-base font-tabular tracking-wide placeholder-slate-500 outline-none transition-all"
                />
                <p className="text-[11px] text-slate-400 mt-2">
                  Coins will be credited directly to this WePlay ID.
                </p>
              </div>
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Example IDs:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleIdChange('28491048')}
                  className="text-purple-400 hover:text-purple-300 font-mono underline cursor-pointer"
                >
                  28491048
                </button>
                <button
                  type="button"
                  onClick={() => handleIdChange('77391024')}
                  className="text-purple-400 hover:text-purple-300 font-mono underline cursor-pointer"
                >
                  77391024
                </button>
                <button
                  type="button"
                  onClick={() => handleIdChange('99104820')}
                  className="text-purple-400 hover:text-purple-300 font-mono underline cursor-pointer"
                >
                  99104820
                </button>
              </div>
            </div>

            {/* Enter WePlay Store Button */}
            <button
              type="button"
              onClick={handleEnterApplication}
              className="w-full py-4 px-6 rounded-2xl font-display font-bold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 text-white hover:from-purple-500 hover:to-indigo-500 transition-all shadow-xl shadow-purple-600/30 cursor-pointer active:scale-[0.99]"
            >
              <span>{googleConnected ? 'Enter WePlay Store' : 'Sign in & Continue'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Google Account Chooser Modal */}
      {showGoogleChooser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-lg text-slate-900 leading-tight">
                  Choose a Google Account
                </h3>
                <p className="text-xs text-slate-500">to continue to WePlay Recharge</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {SAMPLE_GOOGLE_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleGoogleConnect(acc.email, acc.name, acc.avatar)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-100 transition-colors text-left border border-slate-200 cursor-pointer"
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-10 h-10 rounded-full border border-slate-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {acc.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{acc.email}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Google Email input */}
            <form onSubmit={handleCustomGoogleSubmit} className="pt-3 border-t border-slate-200">
              <label htmlFor="custom-email-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Or enter another Google Email:
              </label>
              <div className="flex gap-2">
                <input
                  id="custom-email-input"
                  type="email"
                  placeholder="name@gmail.com"
                  value={customEmailInput}
                  onChange={(e) => setCustomEmailInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGoogleChooser(false)}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 px-3 py-1 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer copyright */}
      <footer className="w-full border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500 z-10">
        WePlay Community Recharge Portal · All rights reserved
      </footer>
    </div>
  );
};

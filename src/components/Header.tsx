import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Gamepad2, User, LogOut, ReceiptText, ChevronDown } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  ordersCount: number;
  onOpenOrders: () => void;
  onLogout: () => void;
  onNavClick: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  ordersCount,
  onOpenOrders,
  onLogout,
  onNavClick,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavClick('packages-section')}
          className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer group"
        >
          <img
            src="/assets/aistudio/IMG_20261027_025101_778f2a22.jpg"
            alt="WePlay Logo"
            className="w-9 h-9 rounded-xl object-cover shadow-md shadow-cyan-500/20 border border-cyan-400/40 group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white whitespace-nowrap shrink-0">
            WEPLAY <span className="text-purple-400 font-semibold text-xs sm:text-sm">STORE</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (4-5 single-line clean links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            type="button"
            onClick={() => onNavClick('packages-section')}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Coin Packages
          </button>
          <button
            type="button"
            onClick={() => onNavClick('how-it-works-section')}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => onNavClick('faq-section')}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            24h Delivery FAQ
          </button>
          <button
            type="button"
            onClick={onOpenOrders}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>My Orders</span>
            {ordersCount > 0 && (
              <span className="font-mono text-xs bg-purple-600 text-white rounded-full px-1.5 py-0.2">
                {ordersCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (User Profile & Account status) */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-white transition-colors cursor-pointer text-xs sm:text-sm"
          >
            <img
              src="/assets/aistudio/IMG_20261027_025101_778f2a22.jpg"
              alt="WePlay"
              className="w-6 h-6 rounded-full object-cover border border-cyan-400/40"
            />
            <div className="text-left hidden sm:block">
              <div className="font-semibold text-xs text-white leading-none font-mono">
                ID: {user.weplayId}
              </div>
              <div className="text-[10px] text-slate-400 leading-none mt-0.5 font-mono">
                {user.googleEmail.split('@')[0]}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 p-3 shadow-2xl text-xs z-50 animate-fadeIn">
              <div className="p-2 border-b border-slate-800 mb-2">
                <div className="font-bold text-white text-sm font-mono">WePlay ID: {user.weplayId}</div>
                <div className="text-slate-400 truncate mt-1">{user.googleEmail}</div>
              </div>

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenOrders();
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-slate-800 text-slate-200 transition-colors text-left cursor-pointer"
                >
                  <ReceiptText className="w-4 h-4 text-purple-400" />
                  <span>My Recharge Orders ({ordersCount})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-red-950/40 text-red-300 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Switch WePlay ID / Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

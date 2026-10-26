import React from 'react';
import { Gamepad2, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/IMG_20261027_025101_778f2a22.jpg"
            alt="WePlay Logo"
            className="w-8 h-8 rounded-lg object-cover border border-cyan-400/40"
          />
          <span className="font-display font-bold text-sm text-white">
            WEPLAY RECHARGE STORE
          </span>
        </div>

        <p className="text-xs text-slate-500 text-center md:text-left max-w-md">
          Orders are manually verified and processed within 24 hours. Keep your phone reachable. Never share your password with anyone.
        </p>

        <div className="text-xs text-slate-500 flex items-center gap-4">
          <span>Privacy & Security</span>
          <span>·</span>
          <span>Terms of Order</span>
          <span>·</span>
          <span>2026 WePlay Top-Up</span>
        </div>
      </div>
    </footer>
  );
};

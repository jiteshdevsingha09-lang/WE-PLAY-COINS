import React from 'react';
import { LogIn, UserCheck, Package, PhoneCall, Clock4, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Google & WePlay Login',
      desc: 'Connect with Google for authorization and enter your numeric WePlay ID to proceed.',
      icon: LogIn,
    },
    {
      step: '02',
      title: 'Select Coin Package',
      desc: 'Browse our 9 exclusive recharge tiers starting at ₹560 for 10,000 coins up to VIP Mythic chests.',
      icon: Package,
    },
    {
      step: '03',
      title: 'Provide Phone Number',
      desc: 'Only your phone number is required to process and confirm your recharge. No game passwords needed.',
      icon: PhoneCall,
    },
    {
      step: '04',
      title: 'Wait Up To 24 Hours',
      desc: 'Your request is queued for manual verification. Coins are credited directly to your WePlay ID within 24h.',
      icon: Clock4,
    },
  ];

  return (
    <section id="how-it-works-section" className="py-12 border-t border-slate-900">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
          Simple & Secure Process
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          How WePlay Recharge Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Fast, streamlined, and 100% password-free. Follow these four simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-purple-400 bg-purple-950/60 border border-purple-500/20 px-2 py-0.5 rounded-md">
                  Step {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

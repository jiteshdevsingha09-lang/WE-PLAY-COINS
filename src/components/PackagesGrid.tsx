import React, { useState } from 'react';
import { CoinPackage, UserProfile } from '../types';
import { PackageCard } from './PackageCard';
import { ShieldCheck, Clock, Coins, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface PackagesGridProps {
  packages: CoinPackage[];
  user: UserProfile;
  onSelectPackage: (pkg: CoinPackage) => void;
  selectedPackageId?: number;
}

export const PackagesGrid: React.FC<PackagesGridProps> = ({
  packages,
  user,
  onSelectPackage,
  selectedPackageId,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'popular' | 'high'>('all');

  const filteredPackages = packages.filter((pkg) => {
    if (filterMode === 'popular') {
      return pkg.isPopular || pkg.isBestValue || pkg.bonusCoins > 0;
    }
    if (filterMode === 'high') {
      return pkg.coins >= 100000;
    }
    return true;
  });

  return (
    <div id="packages-section" className="space-y-8">
      {/* Active Account Status Bar */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <img
            src="/assets/aistudio/IMG_20261027_025101_778f2a22.jpg"
            alt="WePlay Logo"
            className="w-11 h-11 rounded-2xl object-cover border border-cyan-400/40 shadow-md shadow-cyan-500/10"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Target WePlay Account</span>
            </div>
            <div className="text-base font-bold text-white font-mono mt-0.5">
              WePlay ID: <span className="text-purple-400">{user.weplayId}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400 sm:border-l sm:border-slate-800 sm:pl-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-purple-400 shrink-0" />
            <span>24-Hour Delivery Queue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Safe & Official</span>
          </div>
        </div>
      </div>

      {/* Hero Visual Section */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 mb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>OFFICIAL WEPLAY DISCOUNT TOP-UP</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
              Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">Coin Package</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-6">
              Exclusive 9 custom recharge packages. Select any tier from ₹560 for 10,000 coins up to VIP Treasury. Direct manual processing within 24 hours.
            </p>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg">
              <div>
                <div className="font-display font-bold text-white text-base font-tabular">9 Packages</div>
                <div className="text-[11px] text-slate-400">Special store rates</div>
              </div>
              <div>
                <div className="font-display font-bold text-white text-base font-tabular">Phone Only</div>
                <div className="text-[11px] text-slate-400">Zero password needed</div>
              </div>
              <div>
                <div className="font-display font-bold text-white text-base font-tabular">24 Hours</div>
                <div className="text-[11px] text-slate-400">Delivery timeframe</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-64 lg:h-full min-h-[260px] overflow-hidden">
            <img
              src="/src/assets/images/weplay_hero_banner_1793048260418.jpg"
              alt="WePlay Coin Store Showcase"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            Available Coin Packages ({packages.length})
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pick a package below and click Request Order to provide your phone number.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All 9 Packs
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('popular')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterMode === 'popular'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bonus / Popular
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('high')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filterMode === 'high'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            High Tier (≥100K)
          </button>
        </div>
      </div>

      {/* 9 Packages Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onSelect={onSelectPackage}
            isSelected={selectedPackageId === pkg.id}
          />
        ))}
      </div>
    </div>
  );
};

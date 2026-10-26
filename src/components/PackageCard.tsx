import React from 'react';
import { CoinPackage } from '../types';
import { Coins, ArrowRight, Zap, Sparkles } from 'lucide-react';

interface PackageCardProps {
  pkg: CoinPackage;
  onSelect: (pkg: CoinPackage) => void;
  isSelected?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect, isSelected }) => {
  const totalCoins = pkg.coins + pkg.bonusCoins;

  return (
    <div
      className={`group relative rounded-3xl bg-slate-900/90 border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
        isSelected
          ? 'border-purple-500 ring-2 ring-purple-500/30 shadow-xl shadow-purple-950/60 -translate-y-1'
          : pkg.isBestValue
          ? 'border-amber-500/40 hover:border-amber-400 hover:-translate-y-1 shadow-lg shadow-amber-950/20'
          : pkg.isPopular
          ? 'border-purple-500/40 hover:border-purple-400 hover:-translate-y-1 shadow-lg shadow-purple-950/30'
          : 'border-slate-800 hover:border-slate-700 hover:-translate-y-1'
      }`}
    >
      {/* Top Banner Tag if Popular or Best Value */}
      {pkg.isBestValue && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-1 px-4 text-center text-[11px] font-bold tracking-wider uppercase text-slate-950">
          Best Value Offer
        </div>
      )}
      {pkg.isPopular && !pkg.isBestValue && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-1 px-4 text-center text-[11px] font-bold tracking-wider uppercase text-white">
          Most Popular
        </div>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Row: Title & Tier Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Package #{pkg.id}
            </span>
            {pkg.tierBadge && (
              <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/70 border border-purple-500/30 px-2 py-0.5 rounded-full">
                {pkg.tierBadge}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {pkg.title}
          </h3>

          {/* Coin Value Hero */}
          <div className="my-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-center relative overflow-hidden">
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-center gap-2 mb-1">
              <Coins className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-amber-300 tracking-tight font-tabular">
                {pkg.coins.toLocaleString()}
              </span>
            </div>
            <div className="text-xs font-medium text-slate-400">
              WePlay Gold Coins
            </div>

            {pkg.bonusCoins > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+ {pkg.bonusCoins.toLocaleString()} Free Bonus Coins</span>
              </div>
            )}
          </div>

          {/* Rate Breakdown */}
          <div className="text-xs text-slate-400 flex items-center justify-between px-1 mb-4">
            <span>Total delivery:</span>
            <span className="font-mono font-semibold text-white">
              {totalCoins.toLocaleString()} Coins
            </span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-slate-400">Recharge Price</span>
            <div className="text-right">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-white font-tabular">
                {pkg.currencySymbol}{pkg.price.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelect(pkg)}
            className={`w-full py-3 px-4 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              pkg.isBestValue || pkg.isPopular
                ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                : 'bg-slate-800 hover:bg-purple-600 text-white hover:shadow-md'
            }`}
          >
            <span>Request Order</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

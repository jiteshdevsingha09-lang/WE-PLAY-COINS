import React, { useState } from 'react';
import { CoinPackage, UserProfile, OrderRequest } from '../types';
import { COUNTRY_CODES } from '../data/packages';
import { X, Phone, Coins, ShieldCheck, ArrowRight, User } from 'lucide-react';

interface OrderRequestModalProps {
  pkg: CoinPackage;
  user: UserProfile;
  onClose: () => void;
  onSubmitOrder: (order: OrderRequest) => void;
}

export const OrderRequestModal: React.FC<OrderRequestModalProps> = ({
  pkg,
  user,
  onClose,
  onSubmitOrder,
}) => {
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const totalCoins = pkg.coins + pkg.bonusCoins;

  const handlePhoneChange = (val: string) => {
    // Only digits and spaces
    const clean = val.replace(/[^0-9]/g, '');
    setPhoneNumber(clean);
    if (clean.length >= 8) {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 8) {
      setPhoneError('Please enter a valid phone number (at least 8-10 digits).');
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      const now = Date.now();
      const newOrder: OrderRequest = {
        id: `WP-${Math.floor(100000 + Math.random() * 900000)}`,
        packageId: pkg.id,
        packageName: pkg.title,
        coins: pkg.coins,
        bonusCoins: pkg.bonusCoins,
        totalCoins,
        price: pkg.price,
        currencySymbol: pkg.currencySymbol,
        phoneNumber,
        countryCode,
        fullPhone: `${countryCode} ${phoneNumber}`,
        weplayId: user.weplayId,
        googleEmail: user.googleEmail,
        createdAt: now,
        estimatedDeliveryAt: now + 24 * 60 * 60 * 1000, // 24 hours from now
        status: 'pending',
      };

      onSubmitOrder(newOrder);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 animate-scaleUp">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Step 2 · Request Recharge
          </span>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight mt-1">
            Confirm Order Details
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Only your phone number is required to process and confirm this order.
          </p>
        </div>

        {/* Selected Package Summary Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <div className="text-xs text-slate-400">Selected Package #{pkg.id}</div>
              <div className="text-base font-bold text-white">{pkg.title}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Amount</div>
              <div className="text-lg font-bold text-white font-tabular">
                {pkg.currencySymbol}{pkg.price.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between text-xs">
            <span className="text-slate-400">Coins to be credited:</span>
            <div className="flex items-center gap-1.5 font-bold text-amber-300 font-tabular text-sm">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{totalCoins.toLocaleString()} Coins</span>
              {pkg.bonusCoins > 0 && (
                <span className="text-[11px] text-emerald-400 font-normal">
                  (incl. +{pkg.bonusCoins.toLocaleString()} bonus)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="p-3.5 rounded-2xl bg-slate-950/50 border border-slate-800/60 mb-6 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/IMG_20261027_025101_778f2a22.jpg"
              alt="WePlay Logo"
              className="w-8 h-8 rounded-xl object-cover border border-cyan-400/40"
            />
            <div>
              <div className="font-semibold text-slate-200">
                WePlay ID: <span className="text-purple-300 font-mono font-bold">{user.weplayId}</span>
              </div>
              <div className="text-slate-400 text-[11px] truncate max-w-[200px]">
                {user.googleEmail}
              </div>
            </div>
          </div>
          <span className="text-[11px] font-medium text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-md">
            Target ID
          </span>
        </div>

        {/* Form: ONLY asks for Phone Number as requested! */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="phone-input" className="block text-sm font-semibold text-slate-200 mb-2">
              Enter Your Phone Number <span className="text-purple-400">*</span>
            </label>
            <div className="flex gap-2">
              {/* Country Code Selector */}
              <select
                aria-label="Country Code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3 py-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer font-mono shrink-0"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code + c.country} value={c.code} className="bg-slate-900 text-white">
                    {c.flag} {c.code} ({c.country})
                  </option>
                ))}
              </select>

              {/* Phone Number Input */}
              <div className="relative flex-1">
                <input
                  id="phone-input"
                  type="tel"
                  inputMode="numeric"
                  placeholder="e.g. 9876543210"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white rounded-xl px-4 py-3 text-base font-tabular tracking-wider placeholder-slate-500 outline-none transition-all"
                  autoFocus
                />
                <Phone className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {phoneError ? (
              <p className="text-xs text-red-400 mt-1.5">{phoneError}</p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1.5">
                We will contact or send an SMS confirmation to this number regarding your 24-hour recharge.
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
            <span>After submission, your order is placed in the queue with up to 24 hours processing time.</span>
          </div>

          {/* Submit Action */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-display font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Sending Request...</span>
              ) : (
                <>
                  <span>Request Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

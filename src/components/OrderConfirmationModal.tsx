import React, { useEffect, useState } from 'react';
import { OrderRequest } from '../types';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Clock,
  Phone,
  Coins,
  Copy,
  Check,
  AlertCircle,
  Share2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderRequest;
  onClose: () => void;
  onViewOrders: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onViewOrders,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Launch confetti once on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#6366f1', '#fbbf24', '#34d399'],
      });
    } catch {
      // Graceful fallback if canvas is not supported
    }
  }, []);

  // 24 hours live countdown simulation
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Date.now();
      const diff = Math.max(0, order.estimatedDeliveryAt - now);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeRemaining());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [order.estimatedDeliveryAt]);

  const handleCopyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const padZero = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/60 relative my-8 animate-scaleUp">
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Big Success Icon */}
        <div className="text-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Request Has Been Sent!
          </h2>

          {/* Primary 24-Hour Wait Banner */}
          <div className="mt-3 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-indigo-950/80 to-purple-950/90 border border-purple-500/40 text-center">
            <div className="flex items-center justify-center gap-2 text-purple-300 font-bold text-sm uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Wait Till 24 Hours</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200">
              Your recharge request has been queued. Please allow up to <span className="font-bold text-amber-300">24 hours</span> for the coins to reflect in your WePlay account.
            </p>
          </div>
        </div>

        {/* Live 24h Countdown Timer Bar */}
        <div className="mb-5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
          <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider mb-1">
            Estimated Processing Countdown
          </div>
          <div className="flex items-center justify-center gap-3 font-display font-extrabold text-2xl sm:text-3xl text-white font-tabular">
            <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              {padZero(timeLeft.hours)}
              <span className="text-[10px] block text-slate-400 font-normal">HOURS</span>
            </div>
            <span className="text-purple-400 font-bold pb-3">:</span>
            <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              {padZero(timeLeft.minutes)}
              <span className="text-[10px] block text-slate-400 font-normal">MINS</span>
            </div>
            <span className="text-purple-400 font-bold pb-3">:</span>
            <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-amber-400">
              {padZero(timeLeft.seconds)}
              <span className="text-[10px] block text-slate-400 font-normal">SECS</span>
            </div>
          </div>
        </div>

        {/* Order Details Receipt Box */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs space-y-2.5 mb-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400">Order ID:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-purple-300 text-sm">{order.id}</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Copy Order ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">WePlay User ID:</span>
            <span className="font-mono font-semibold text-white">{order.weplayId}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Package Requested:</span>
            <span className="font-semibold text-white">{order.packageName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Total Coins:</span>
            <span className="font-bold text-amber-300 font-tabular">{order.totalCoins.toLocaleString()} Coins</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Amount:</span>
            <span className="font-bold text-white font-tabular">{order.currencySymbol}{order.price.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-slate-400">Registered Phone:</span>
            <span className="font-mono font-semibold text-emerald-400">{order.fullPhone}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Queue Status:</span>
            <span className="text-purple-300 font-medium bg-purple-950/80 border border-purple-500/30 px-2 py-0.5 rounded-full text-[11px]">
              In Verification Queue
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-[11px] text-slate-400 mb-6 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <span>
            Keep your phone reachable. You will receive an SMS confirmation once the coins are transferred into your WePlay ID. Do not share your password with anyone.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={onViewOrders}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            Track in My Orders
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-display font-bold transition-all shadow-md shadow-purple-600/30 cursor-pointer text-center"
          >
            Return to Store
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { OrderRequest } from '../types';
import { X, Clock, CheckCircle2, Phone, Coins, Copy, Trash2, ExternalLink } from 'lucide-react';

interface OrdersTrackerProps {
  orders: OrderRequest[];
  onClose: () => void;
  onClearOrders: () => void;
}

export const OrdersTracker: React.FC<OrdersTrackerProps> = ({
  orders,
  onClose,
  onClearOrders,
}) => {
  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTimeLeftString = (deliveryAt: number) => {
    const diff = Math.max(0, deliveryAt - Date.now());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (diff === 0) return 'Completed / Delivered';
    return `${hours}h ${mins}m remaining (Wait till 24h)`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col p-6 shadow-2xl relative animate-slideLeft">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="font-display text-xl font-bold text-white tracking-tight">
              My Recharge Orders
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Track status of your submitted coin requests ({orders.length})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 24h notice banner */}
        <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Orders require up to 24 hours from submission for direct coin deposit.</span>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-1">
          {orders.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Coins className="w-12 h-12 text-slate-600 mb-3" />
              <div className="text-sm font-semibold text-slate-300">No Orders Yet</div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Select a package from the store and submit your phone number to place a request.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const remaining = getTimeLeftString(order.estimatedDeliveryAt);
              return (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-purple-300">
                      {order.id}
                    </span>
                    <span className="text-[11px] font-medium text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Pending Verification
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <div className="font-bold text-white text-sm">
                      {order.packageName}
                    </div>
                    <div className="font-mono font-bold text-amber-300 text-sm">
                      {order.totalCoins.toLocaleString()} Coins
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-900">
                    <div className="flex justify-between">
                      <span>WePlay ID:</span>
                      <span className="font-mono text-slate-200">{order.weplayId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-mono text-slate-200">{order.fullPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Submitted:</span>
                      <span>{formatDate(order.createdAt)} at {formatTime(order.createdAt)}</span>
                    </div>
                    <div className="flex justify-between pt-1 text-[11px]">
                      <span className="text-purple-400 font-medium">Estimated wait:</span>
                      <span className="text-purple-300 font-medium">{remaining}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        {orders.length > 0 && (
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClearOrders}
              className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

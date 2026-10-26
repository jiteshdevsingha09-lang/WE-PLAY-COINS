import React, { useState, useEffect } from 'react';
import { UserProfile, CoinPackage, OrderRequest } from './types';
import { WEPLAY_PACKAGES } from './data/packages';
import { WePlayLogin } from './components/WePlayLogin';
import { Header } from './components/Header';
import { PackagesGrid } from './components/PackagesGrid';
import { OrderRequestModal } from './components/OrderRequestModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrdersTracker } from './components/OrdersTracker';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

const USER_STORAGE_KEY = 'weplay_active_user';
const ORDERS_STORAGE_KEY = 'weplay_saved_orders';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore storage read error
    }
    return null;
  });

  const [orders, setOrders] = useState<OrderRequest[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore storage read error
    }
    return [];
  });

  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRequest | null>(null);
  const [isOrdersTrackerOpen, setIsOrdersTrackerOpen] = useState<boolean>(false);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage write error
    }
  }, [orders]);

  // Handle successful login from starting page
  const handleLoginSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore storage write error
    }
  };

  // Handle logout / switch WePlay ID
  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // Ignore storage write error
    }
  };

  // When user clicks "Request Order" on a package card
  const handleSelectPackage = (pkg: CoinPackage) => {
    setSelectedPackage(pkg);
    setIsOrderModalOpen(true);
  };

  // When user submits their phone number in OrderRequestModal
  const handleSubmitOrder = (newOrder: OrderRequest) => {
    setOrders((prev) => [newOrder, ...prev]);
    setIsOrderModalOpen(false);
    setConfirmedOrder(newOrder);
  };

  // Clear orders history
  const handleClearOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem(ORDERS_STORAGE_KEY);
    } catch {
      // Ignore storage write error
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. If not logged in: Render Starting Page (WEPLAY LOGIN with Google & WePlay ID)
  if (!user) {
    return (
      <WePlayLogin
        onLoginSuccess={handleLoginSuccess}
        defaultEmail="jiteshdevsingha09@gmail.com"
      />
    );
  }

  // 2. Main Store View after entering the application
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        user={user}
        ordersCount={orders.length}
        onOpenOrders={() => setIsOrdersTrackerOpen(true)}
        onLogout={handleLogout}
        onNavClick={scrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-12">
        {/* 9 Packages Grid */}
        <PackagesGrid
          packages={WEPLAY_PACKAGES}
          user={user}
          onSelectPackage={handleSelectPackage}
          selectedPackageId={selectedPackage?.id}
        />

        {/* How It Works Section */}
        <HowItWorks />

        {/* 24-Hour FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal 1: Request Order (Only asks for Phone Number!) */}
      {isOrderModalOpen && selectedPackage && (
        <OrderRequestModal
          pkg={selectedPackage}
          user={user}
          onClose={() => setIsOrderModalOpen(false)}
          onSubmitOrder={handleSubmitOrder}
        />
      )}

      {/* Modal 2: Order Confirmation (Shows "Request has been sent wait till 24 hours") */}
      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
          onViewOrders={() => {
            setConfirmedOrder(null);
            setIsOrdersTrackerOpen(true);
          }}
        />
      )}

      {/* Slide-out Drawer: Orders Tracker */}
      {isOrdersTrackerOpen && (
        <OrdersTracker
          orders={orders}
          onClose={() => setIsOrdersTrackerOpen(false)}
          onClearOrders={handleClearOrders}
        />
      )}
    </div>
  );
}

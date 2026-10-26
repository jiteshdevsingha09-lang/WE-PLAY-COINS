export interface UserProfile {
  googleEmail: string;
  googleName: string;
  googleAvatar: string;
  weplayId: string;
  isLoggedIn: boolean;
}

export interface CoinPackage {
  id: number;
  title: string;
  coins: number;
  bonusCoins: number;
  price: number;
  currencySymbol: string;
  tierBadge?: string;
  tierColor?: 'violet' | 'amber' | 'emerald' | 'cyan' | 'fuchsia';
  isPopular?: boolean;
  isBestValue?: boolean;
}

export interface OrderRequest {
  id: string;
  packageId: number;
  packageName: string;
  coins: number;
  bonusCoins: number;
  totalCoins: number;
  price: number;
  currencySymbol: string;
  phoneNumber: string;
  countryCode: string;
  fullPhone: string;
  weplayId: string;
  googleEmail: string;
  createdAt: number;
  estimatedDeliveryAt: number;
  status: 'pending' | 'verifying' | 'completed';
}

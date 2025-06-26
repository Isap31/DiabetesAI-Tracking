export interface SubscriptionPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  savings?: string;
}

// Type definitions for RevenueCat (since we can't import them directly)
interface PurchasesOffering {
  identifier: string;
  serverDescription: string;
  availablePackages: PurchasesPackage[];
}

interface PurchasesPackage {
  identifier: string;
  packageType: string;
  product: any;
  offeringIdentifier: string;
}

interface CustomerInfo {
  originalAppUserId: string;
  entitlements: {
    active: { [key: string]: any };
    all: { [key: string]: any };
  };
  activeSubscriptions: string[];
  allPurchasedProductIdentifiers: string[];
  nonSubscriptionTransactions: any[];
  firstSeen: string;
  originalPurchaseDate: string | null;
  requestDate: string;
  latestExpirationDate: string | null;
  originalApplicationVersion: string | null;
  managementURL: string | null;
}

class RevenueCatService {
  private isInitialized = false;
  private Purchases: any = null;

  private async loadPurchases(): Promise<any> {
    if (this.Purchases) {
      return this.Purchases;
    }

    // Check if we're in a Capacitor environment
    if (typeof window !== 'undefined' && (window as any).Capacitor) {
      try {
        const { Purchases } = await import('@revenuecat/purchases-capacitor');
        this.Purchases = Purchases;
        return Purchases;
      } catch (error) {
        console.warn('Failed to load RevenueCat Capacitor plugin:', error);
        return this.getMockPurchases();
      }
    } else {
      // Web environment - use mock implementation
      return this.getMockPurchases();
    }
  }

  private getMockPurchases() {
    return {
      configure: async (config: any) => {
        console.log('Mock RevenueCat configure:', config);
      },
      getOfferings: async () => {
        console.log('Mock RevenueCat getOfferings');
        return { all: {} };
      },
      purchasePackage: async (packageInfo: any) => {
        console.log('Mock RevenueCat purchasePackage:', packageInfo);
        return { customerInfo: this.getMockCustomerInfo() };
      },
      restorePurchases: async () => {
        console.log('Mock RevenueCat restorePurchases');
        return this.getMockCustomerInfo();
      },
      getCustomerInfo: async () => {
        console.log('Mock RevenueCat getCustomerInfo');
        return this.getMockCustomerInfo();
      },
      logIn: async (userInfo: any) => {
        console.log('Mock RevenueCat logIn:', userInfo);
      },
      logOut: async () => {
        console.log('Mock RevenueCat logOut');
      }
    };
  }

  private getMockCustomerInfo(): CustomerInfo {
    return {
      originalAppUserId: 'mock-user',
      entitlements: {
        active: {},
        all: {}
      },
      activeSubscriptions: [],
      allPurchasedProductIdentifiers: [],
      nonSubscriptionTransactions: [],
      firstSeen: new Date().toISOString(),
      originalPurchaseDate: null,
      requestDate: new Date().toISOString(),
      latestExpirationDate: null,
      originalApplicationVersion: null,
      managementURL: null
    };
  }

  async initialize(apiKey: string, userId?: string): Promise<void> {
    try {
      const Purchases = await this.loadPurchases();
      await Purchases.configure({ apiKey, appUserID: userId });
      this.isInitialized = true;
      console.log('RevenueCat initialized successfully');
    } catch (error) {
      console.error('Failed to initialize RevenueCat:', error);
      throw error;
    }
  }

  async getOfferings(): Promise<PurchasesOffering[]> {
    if (!this.isInitialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      const Purchases = await this.loadPurchases();
      const offerings = await Purchases.getOfferings();
      return offerings.all ? Object.values(offerings.all) : [];
    } catch (error) {
      console.error('Failed to get offerings:', error);
      return [];
    }
  }

  async purchasePackage(packageToPurchase: PurchasesPackage): Promise<CustomerInfo> {
    if (!this.isInitialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      const Purchases = await this.loadPurchases();
      const { customerInfo } = await Purchases.purchasePackage({ aPackage: packageToPurchase });
      return customerInfo;
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  }

  async restorePurchases(): Promise<CustomerInfo> {
    if (!this.isInitialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      const Purchases = await this.loadPurchases();
      const customerInfo = await Purchases.restorePurchases();
      return customerInfo;
    } catch (error) {
      console.error('Restore purchases failed:', error);
      throw error;
    }
  }

  async getCustomerInfo(): Promise<CustomerInfo | null> {
    if (!this.isInitialized) {
      return null;
    }

    try {
      const Purchases = await this.loadPurchases();
      const customerInfo = await Purchases.getCustomerInfo();
      return customerInfo;
    } catch (error) {
      console.error('Failed to get customer info:', error);
      return null;
    }
  }

  async setUserId(userId: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error('RevenueCat not initialized');
    }

    try {
      const Purchases = await this.loadPurchases();
      await Purchases.logIn({ appUserID: userId });
    } catch (error) {
      console.error('Failed to set user ID:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    try {
      const Purchases = await this.loadPurchases();
      await Purchases.logOut();
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  }

  isUserPremium(customerInfo: CustomerInfo): boolean {
    return Object.keys(customerInfo.entitlements.active).length > 0;
  }

  // Web fallback methods for development
  async initializeWeb(): Promise<void> {
    console.log('RevenueCat Web SDK not available - using mock implementation');
    this.isInitialized = true;
  }

  async mockPurchase(planId: string): Promise<boolean> {
    console.log(`Mock purchase for plan: ${planId}`);
    // In a real implementation, you'd integrate with Stripe or another web payment processor
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  }
}

export const revenueCatService = new RevenueCatService();
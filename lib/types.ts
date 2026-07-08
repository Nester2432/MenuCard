// ============================================================
// Core TypeScript interfaces for the restaurant digital menu
// Designed to be backend-ready: IDs are strings (UUID-compatible)
// ============================================================

export interface RestaurantInfo {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  coverImage: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
    tiktok?: string;
  };
  settings: {
    /** When false, unavailable products are hidden; when true, shown with "No disponible" tag */
    showUnavailableProducts: boolean;
    currency: string;
    currencySymbol: string;
    primaryColor: string;
  };
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  slug: string;
  description?: string;
  order: number;
  active: boolean;
}

export interface ProductOption {
  id: string;
  label: string;       // e.g. "Elegir salsa"
  required: boolean;
  choices: string[];   // e.g. ["Tuco", "Crema", "Mixta"]
}

export interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  categoryId: string;
  image: string;
  available: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  options?: ProductOption[];
  order: number;
  createdAt: string;
}

// For admin forms
export type ProductFormData = Omit<Product, 'id' | 'createdAt'>;
export type CategoryFormData = Omit<Category, 'id'>;

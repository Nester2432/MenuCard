"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Category, Product, RestaurantInfo } from "@/lib/types";
import { categories as initialCategories } from "@/lib/data/categories";
import { products as initialProducts } from "@/lib/data/products";
import { restaurant as initialRestaurant } from "@/lib/data/restaurant";

// ─── State ──────────────────────────────────────────────
interface MenuState {
  restaurant: RestaurantInfo;
  categories: Category[];
  products: Product[];
  isAdminAuthenticated: boolean;
  isHydrated: boolean;
}

// ─── Actions ────────────────────────────────────────────
type MenuAction =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "HYDRATE_STATE"; payload: Partial<Omit<MenuState, "isHydrated" | "isAdminAuthenticated">> }
  // Restaurant
  | { type: "UPDATE_RESTAURANT"; payload: RestaurantInfo }
  // Categories
  | { type: "ADD_CATEGORY"; payload: Category }
  | { type: "UPDATE_CATEGORY"; payload: Category }
  | { type: "DELETE_CATEGORY"; payload: string }
  // Products
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "TOGGLE_AVAILABILITY"; payload: string }
  | { type: "UPDATE_PRICE"; payload: { id: string; price: number } };

// ─── Reducer ────────────────────────────────────────────
function menuReducer(state: MenuState, action: MenuAction): MenuState {
  switch (action.type) {
    case "HYDRATE_STATE":
      return { ...state, ...action.payload, isHydrated: true };
    case "LOGIN":
      return { ...state, isAdminAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAdminAuthenticated: false };
    case "UPDATE_RESTAURANT":
      return { ...state, restaurant: action.payload };
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload),
      };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case "TOGGLE_AVAILABILITY":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload ? { ...p, available: !p.available } : p
        ),
      };
    case "UPDATE_PRICE":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? { ...p, price: action.payload.price } : p
        ),
      };
    default:
      return state;
  }
}

// ─── Context ────────────────────────────────────────────
interface MenuContextValue {
  state: MenuState;
  dispatch: React.Dispatch<MenuAction>;
}

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

const STORAGE_KEY = "menu_online_state";

export function MenuProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(menuReducer, {
    restaurant: initialRestaurant,
    categories: initialCategories,
    products: initialProducts,
    isAdminAuthenticated: false,
    isHydrated: false,
  });

  // Load from localStorage on mount (client-only, post-hydration)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: "HYDRATE_STATE", payload: parsed });
      } else {
        dispatch({ type: "HYDRATE_STATE", payload: {} });
      }
    } catch {
      dispatch({ type: "HYDRATE_STATE", payload: {} });
    }
  }, []);

  // Persist to localStorage (except auth/hydration state)
  useEffect(() => {
    if (!state.isHydrated) return;
    const { isAdminAuthenticated, isHydrated, ...toStore } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [state]);

  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used inside MenuProvider");
  return ctx;
}

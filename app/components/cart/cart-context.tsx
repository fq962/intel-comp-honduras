"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/app/lib/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type ResolvedCartItem = CartItem & { product: Product };

type CartContextValue = {
  resolvedItems: ResolvedCartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "intelcomp-cart";
const MAX_QUANTITY = 99;
const FREE_SHIPPING_THRESHOLD = 5000;
const FLAT_SHIPPING_RATE = 150;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage on mount: window/localStorage
    // aren't available during SSR, so this can't be a lazy useState initializer.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // corrupted or inaccessible storage: start with an empty cart
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // private browsing / quota exceeded: cart just won't persist
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((i) => i.productId === product.id);
      if (existing) {
        return current.map((i) =>
          i.productId === product.id
            ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + quantity) }
            : i,
        );
      }
      return [
        ...current,
        { productId: product.id, quantity: Math.min(MAX_QUANTITY, quantity) },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((i) => i.productId !== productId)
        : current.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.min(MAX_QUANTITY, quantity) }
              : i,
          ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const resolvedItems = useMemo(() => {
    return items.flatMap((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return product ? [{ ...item, product }] : [];
    });
  }, [items]);

  const totalItems = useMemo(
    () => resolvedItems.reduce((sum, i) => sum + i.quantity, 0),
    [resolvedItems],
  );
  const subtotal = useMemo(
    () => resolvedItems.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
    [resolvedItems],
  );
  const shipping = useMemo(() => {
    if (resolvedItems.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
  }, [resolvedItems.length, subtotal]);
  const total = subtotal + shipping;

  const value: CartContextValue = {
    resolvedItems,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    totalItems,
    subtotal,
    shipping,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

export { FREE_SHIPPING_THRESHOLD };

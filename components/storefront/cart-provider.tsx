"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  colorHex: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "alpaca-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        // Reading persisted cart state is a one-time client hydration step.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = (item: Omit<CartItem, "id" | "quantity">, quantity = 1) => {
    setItems((current) => {
      const id = `${item.slug}-${item.size}-${item.color}`;
      const existing = current.find((entry) => entry.id === id);

      if (existing) {
        return current.map((entry) =>
          entry.id === id ? { ...entry, quantity: entry.quantity + quantity } : entry,
        );
      }

      return [...current, { ...item, id, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((entry) => (entry.id === id ? { ...entry, quantity } : entry))
        .filter((entry) => entry.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};

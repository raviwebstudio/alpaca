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

export type CheckoutAddress = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export type PaymentMethod = "upi" | "card" | "netbanking";

export type OrderRecord = {
  reference: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  address: CheckoutAddress;
  paymentMethod: PaymentMethod;
  placedAt: string;
};

type CheckoutOverrides = {
  address?: CheckoutAddress;
  paymentMethod?: PaymentMethod;
};

type CartProductInput = Omit<CartItem, "id" | "quantity">;

type CartContextValue = {
  hydrated: boolean;
  items: CartItem[];
  cartItems: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  totalPrice: number;
  checkoutAddress: CheckoutAddress;
  paymentMethod: PaymentMethod;
  lastOrder: OrderRecord | null;
  addItem: (item: CartProductInput, quantity?: number) => void;
  addToCart: (item: CartProductInput, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  saveCheckoutAddress: (address: CheckoutAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  completeOrder: (overrides?: CheckoutOverrides) => OrderRecord | null;
  clearLastOrder: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "alpaca-cart";

const DEFAULT_ADDRESS: CheckoutAddress = {
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

const getShipping = (subtotal: number, itemCount: number) =>
  subtotal >= 4999 ? 0 : itemCount ? 249 : 0;

type StoredState = {
  items?: CartItem[];
  checkoutAddress?: CheckoutAddress;
  paymentMethod?: PaymentMethod;
  lastOrder?: OrderRecord | null;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutAddress, setCheckoutAddress] = useState<CheckoutAddress>(DEFAULT_ADDRESS);
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod>("upi");
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as StoredState | CartItem[];

        if (Array.isArray(parsed)) {
          // Backward compatibility for the previous cart-only storage shape.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(parsed);
        } else {
          // Hydrate persisted checkout state once on the client after mount.
          setItems(parsed.items ?? []);
          setCheckoutAddress(parsed.checkoutAddress ?? DEFAULT_ADDRESS);
          setPaymentMethodState(parsed.paymentMethod ?? "upi");
          setLastOrder(parsed.lastOrder ?? null);
        }
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

    const state: StoredState = {
      items,
      checkoutAddress,
      paymentMethod,
      lastOrder,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [checkoutAddress, hydrated, items, lastOrder, paymentMethod]);

  const addItem = (item: CartProductInput, quantity = 1) => {
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

  const saveCheckoutAddress = (address: CheckoutAddress) => {
    setCheckoutAddress(address);
  };

  const setPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethodState(method);
  };

  const clearLastOrder = () => {
    setLastOrder(null);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = getShipping(subtotal, itemCount);
  const total = subtotal + shipping;

  const completeOrder = (overrides?: CheckoutOverrides) => {
    if (!items.length) {
      return null;
    }

    const address = overrides?.address ?? checkoutAddress;
    const method = overrides?.paymentMethod ?? paymentMethod;

    const order: OrderRecord = {
      reference: `ALP-${Date.now().toString().slice(-6)}`,
      items,
      subtotal,
      shipping,
      total,
      address,
      paymentMethod: method,
      placedAt: new Date().toISOString(),
    };

    setLastOrder(order);
    setItems([]);
    setCheckoutAddress(DEFAULT_ADDRESS);
    setPaymentMethodState("upi");

    return order;
  };

  const value: CartContextValue = {
    hydrated,
    items,
    cartItems: items,
    itemCount,
    subtotal,
    shipping,
    total,
    totalPrice: total,
    checkoutAddress,
    paymentMethod,
    lastOrder,
    addItem,
    addToCart: addItem,
    updateQuantity,
    removeItem,
    removeFromCart: removeItem,
    clearCart,
    saveCheckoutAddress,
    setPaymentMethod,
    completeOrder,
    clearLastOrder,
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

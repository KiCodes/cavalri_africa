import { createContext, useContext, useEffect, useState } from 'react';
import { parsePrice } from '../utils/currency';

const CartContext = createContext(null);
const STORAGE_KEY = 'cavalri_cart';

function lineKey(handle, size) {
  return `${handle}::${size}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product, size, quantity, image) {
    const key = lineKey(product.handle, size);
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...current,
        { key, handle: product.handle, title: product.title, price: product.price, size, quantity, image },
      ];
    });
    setIsOpen(true);
  }

  function removeItem(key) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  function updateQuantity(key, quantity) {
    setItems((current) =>
      current
        .map((item) => (item.key === key ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        count,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

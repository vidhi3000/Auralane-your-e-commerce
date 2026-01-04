import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartContextType, Product } from '@/types';
import { toast } from '@/hooks/use-toast';

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'auralane_cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        // Ignore localStorage errors (e.g., quota exceeded)
      }
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => 
          item.product.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
      );

      if (existingItem) {
        toast({
          title: "Updated quantity",
          description: `${product.name} quantity updated in your cart.`,
        });
        return prevCart.map((item) =>
          item.product.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
      return [...prevCart, { product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: number, size?: string, color?: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) =>
        i.product.id === productId &&
        i.selectedSize === size &&
        i.selectedColor === color
      );
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.product.name} has been removed from your cart.`,
        });
      }
      return prevCart.filter((item) =>
        !(item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color)
      );
    });
  };

  const updateQuantity = (productId: number, quantity: number, size?: string, color?: string) => {
    if (quantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

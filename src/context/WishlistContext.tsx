"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface WishlistItem {
  productId: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  slug: string;
  rating: number;
  reviewCount: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (item: WishlistItem) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  wishlistCount: 0,
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  toggleWishlist: () => false,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("luxora-wishlist");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("luxora-wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === item.productId)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => items.some((i) => i.productId === productId),
    [items]
  );

  const toggleWishlist = useCallback(
    (item: WishlistItem): boolean => {
      const inWishlist = items.some((i) => i.productId === item.productId);
      if (inWishlist) {
        setItems((prev) => prev.filter((i) => i.productId !== item.productId));
        return false;
      } else {
        setItems((prev) => [...prev, item]);
        return true;
      }
    },
    [items]
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        wishlistCount: items.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}

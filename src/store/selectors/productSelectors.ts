import { createSelector } from "@reduxjs/toolkit";
import type { Product } from "../slices/shoppingCartSlice";
import type { RootState } from "../store";

// Base selectors
export const selectSearchTerm = (state: RootState) => state.filter.searchTerm;
export const selectSelectedCategories = (state: RootState) =>
  state.filter.selectedCategories;
export const selectPriceRange = (state: RootState) => state.filter.priceRange;
export const selectSortBy = (state: RootState) => state.filter.sortBy;

// Memoized selector for filtered and sorted products
export const selectFilteredProducts = createSelector(
  [
    (_state: RootState, products: Product[]) => products,
    selectSearchTerm,
    selectSelectedCategories,
    selectPriceRange,
    selectSortBy,
  ],
  (products, searchTerm, selectedCategories, priceRange, sortBy) => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(lowerSearch),
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "none":
      default:
        // Keep original order
        break;
    }

    return filtered;
  },
);

// Selector for unique categories from products
export const selectAvailableCategories = createSelector(
  [(_state: RootState, products: Product[]) => products],
  (products) => {
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories).sort();
  },
);

// Selector for price statistics
export const selectPriceStats = createSelector(
  [(_state: RootState, products: Product[]) => products],
  (products) => {
    if (products.length === 0) {
      return { min: 0, max: 1000, average: 0 };
    }

    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
      average: prices.reduce((sum, price) => sum + price, 0) / prices.length,
    };
  },
);

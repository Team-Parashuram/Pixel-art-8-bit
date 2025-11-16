import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "none";

export interface FilterState {
  searchTerm: string;
  selectedCategories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: SortOption;
}

const initialState: FilterState = {
  searchTerm: "",
  selectedCategories: [],
  priceRange: {
    min: 0,
    max: 1000,
  },
  sortBy: "none",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.selectedCategories.indexOf(category);

      if (index > -1) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(category);
      }
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    clearCategories: (state) => {
      state.selectedCategories = [];
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>,
    ) => {
      state.priceRange = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.priceRange.min = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.priceRange.max = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = "";
      state.selectedCategories = [];
      state.priceRange = { min: 0, max: 1000 };
      state.sortBy = "none";
    },
  },
});

export const {
  setSearchTerm,
  toggleCategory,
  setSelectedCategories,
  clearCategories,
  setPriceRange,
  setMinPrice,
  setMaxPrice,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

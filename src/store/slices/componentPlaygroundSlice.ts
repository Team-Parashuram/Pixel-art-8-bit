import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ComponentConfig {
  componentId: string;
  props: Record<string, any>;
  showCode: boolean;
  variant?: string;
}

export interface PlaygroundState {
  configurations: Record<string, ComponentConfig>;
  bookmarkedComponents: string[];
  recentlyViewed: string[];
  codeSnippets: Record<string, string>;
}

const initialState: PlaygroundState = {
  configurations: {},
  bookmarkedComponents: [],
  recentlyViewed: [],
  codeSnippets: {},
};

const componentPlaygroundSlice = createSlice({
  name: "componentPlayground",
  initialState,
  reducers: {
    updateComponentConfig: (state, action: PayloadAction<ComponentConfig>) => {
      state.configurations[action.payload.componentId] = action.payload;
    },
    toggleShowCode: (state, action: PayloadAction<string>) => {
      const config = state.configurations[action.payload];
      if (config) {
        config.showCode = !config.showCode;
      } else {
        state.configurations[action.payload] = {
          componentId: action.payload,
          props: {},
          showCode: true,
        };
      }
    },
    bookmarkComponent: (state, action: PayloadAction<string>) => {
      if (!state.bookmarkedComponents.includes(action.payload)) {
        state.bookmarkedComponents.push(action.payload);
      }
    },
    unbookmarkComponent: (state, action: PayloadAction<string>) => {
      state.bookmarkedComponents = state.bookmarkedComponents.filter(
        (id) => id !== action.payload,
      );
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const index = state.bookmarkedComponents.indexOf(action.payload);
      if (index > -1) {
        state.bookmarkedComponents.splice(index, 1);
      } else {
        state.bookmarkedComponents.push(action.payload);
      }
    },
    addToRecentlyViewed: (state, action: PayloadAction<string>) => {
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(
        (id) => id !== action.payload,
      );
      // Add to beginning
      state.recentlyViewed.unshift(action.payload);
      // Keep only last 10
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed = state.recentlyViewed.slice(0, 10);
      }
    },
    saveCodeSnippet: (
      state,
      action: PayloadAction<{ componentId: string; code: string }>,
    ) => {
      state.codeSnippets[action.payload.componentId] = action.payload.code;
    },
    clearComponentConfig: (state, action: PayloadAction<string>) => {
      delete state.configurations[action.payload];
    },
    resetPlayground: () => initialState,
  },
});

export const {
  updateComponentConfig,
  toggleShowCode,
  bookmarkComponent,
  unbookmarkComponent,
  toggleBookmark,
  addToRecentlyViewed,
  saveCodeSnippet,
  clearComponentConfig,
  resetPlayground,
} = componentPlaygroundSlice.actions;

export default componentPlaygroundSlice.reducer;

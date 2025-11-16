import { configureStore } from "@reduxjs/toolkit";
import componentPlaygroundReducer from "./slices/componentPlaygroundSlice";
import filterReducer from "./slices/filterSlice";
import shoppingCartReducer from "./slices/shoppingCartSlice";
import toastReducer from "./slices/toastSlice";
import uiReducer from "./slices/uiSlice";
import userPreferencesReducer from "./slices/userPreferencesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userPreferences: userPreferencesReducer,
      componentPlayground: componentPlaygroundReducer,
      shoppingCart: shoppingCartReducer,
      toast: toastReducer,
      ui: uiReducer,
      filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { configureStore } from '@reduxjs/toolkit'
import userPreferencesReducer from './slices/userPreferencesSlice'
import componentPlaygroundReducer from './slices/componentPlaygroundSlice'
import shoppingCartReducer from './slices/shoppingCartSlice'
import toastReducer from './slices/toastSlice'
import uiReducer from './slices/uiSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      userPreferences: userPreferencesReducer,
      componentPlayground: componentPlaygroundReducer,
      shoppingCart: shoppingCartReducer,
      toast: toastReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [],
        },
      }),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

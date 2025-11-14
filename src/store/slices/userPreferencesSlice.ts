import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserPreferences {
  username: string
  email: string
  notifications: boolean
  theme: 'light' | 'dark' | 'system'
  favoriteComponents: string[]
  language: string
  compactMode: boolean
}

const initialState: UserPreferences = {
  username: '',
  email: '',
  notifications: true,
  theme: 'dark',
  favoriteComponents: [],
  language: 'en',
  compactMode: false,
}

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },
    addFavoriteComponent: (state, action: PayloadAction<string>) => {
      if (!state.favoriteComponents.includes(action.payload)) {
        state.favoriteComponents.push(action.payload)
      }
    },
    removeFavoriteComponent: (state, action: PayloadAction<string>) => {
      state.favoriteComponents = state.favoriteComponents.filter(
        (component) => component !== action.payload
      )
    },
    toggleFavoriteComponent: (state, action: PayloadAction<string>) => {
      const index = state.favoriteComponents.indexOf(action.payload)
      if (index > -1) {
        state.favoriteComponents.splice(index, 1)
      } else {
        state.favoriteComponents.push(action.payload)
      }
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    toggleCompactMode: (state) => {
      state.compactMode = !state.compactMode
    },
    resetPreferences: () => initialState,
  },
})

export const {
  setUsername,
  setEmail,
  toggleNotifications,
  setNotifications,
  setTheme,
  addFavoriteComponent,
  removeFavoriteComponent,
  toggleFavoriteComponent,
  setLanguage,
  toggleCompactMode,
  resetPreferences,
} = userPreferencesSlice.actions

export default userPreferencesSlice.reducer

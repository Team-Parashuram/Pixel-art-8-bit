import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  searchOpen: boolean
  searchQuery: string
  activeModal: string | null
  loading: boolean
  debugMode: boolean
  showGridOverlay: boolean
}

const initialState: UIState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  searchOpen: false,
  searchQuery: '',
  activeModal: null,
  loading: false,
  debugMode: false,
  showGridOverlay: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebarCollapsed: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen
      if (!state.searchOpen) {
        state.searchQuery = ''
      }
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload
      if (!action.payload) {
        state.searchQuery = ''
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload
    },
    closeModal: (state) => {
      state.activeModal = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    toggleDebugMode: (state) => {
      state.debugMode = !state.debugMode
    },
    toggleGridOverlay: (state) => {
      state.showGridOverlay = !state.showGridOverlay
    },
    resetUI: () => initialState,
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapsed,
  setSidebarCollapsed,
  toggleSearch,
  setSearchOpen,
  setSearchQuery,
  openModal,
  closeModal,
  setLoading,
  toggleDebugMode,
  toggleGridOverlay,
  resetUI,
} = uiSlice.actions

export default uiSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface ShoppingCartState {
  items: CartItem[]
  wishlist: Product[]
  total: number
  itemCount: number
}

const initialState: ShoppingCartState = {
  items: [],
  wishlist: [],
  total: 0,
  itemCount: 0,
}

const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { total, itemCount }
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      
      const { total, itemCount } = calculateTotals(state.items)
      state.total = total
      state.itemCount = itemCount
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      
      const { total, itemCount } = calculateTotals(state.items)
      state.total = total
      state.itemCount = itemCount
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload.id)
        } else {
          item.quantity = action.payload.quantity
        }
      }
      
      const { total, itemCount } = calculateTotals(state.items)
      state.total = total
      state.itemCount = itemCount
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload)
      
      if (item) {
        item.quantity += 1
      }
      
      const { total, itemCount } = calculateTotals(state.items)
      state.total = total
      state.itemCount = itemCount
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload)
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload)
        }
      }
      
      const { total, itemCount } = calculateTotals(state.items)
      state.total = total
      state.itemCount = itemCount
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.itemCount = 0
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      if (!state.wishlist.find((item) => item.id === action.payload.id)) {
        state.wishlist.push(action.payload)
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload)
    },
    moveToCart: (state, action: PayloadAction<string>) => {
      const wishlistItem = state.wishlist.find((item) => item.id === action.payload)
      
      if (wishlistItem) {
        const existingCartItem = state.items.find((item) => item.id === action.payload)
        
        if (existingCartItem) {
          existingCartItem.quantity += 1
        } else {
          state.items.push({ ...wishlistItem, quantity: 1 })
        }
        
        state.wishlist = state.wishlist.filter((item) => item.id !== action.payload)
        
        const { total, itemCount } = calculateTotals(state.items)
        state.total = total
        state.itemCount = itemCount
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
} = shoppingCartSlice.actions

export default shoppingCartSlice.reducer

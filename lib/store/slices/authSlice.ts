"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SerializableUser {
  uid: string
  email: string | null
  displayName: string | null
  emailVerified: boolean
  photoURL: string | null
}

interface AuthState {
  user: SerializableUser | null
  isAuthenticated: boolean
  loading: boolean
  isEmailVerified: boolean
  isInitialized: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  isEmailVerified: false,
  isInitialized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SerializableUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isEmailVerified = action.payload?.emailVerified ?? false;
      state.loading = false;
      state.isInitialized = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEmailVerified: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerified = action.payload;
      if (state.user) {
        state.user.emailVerified = action.payload;
      }
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.isEmailVerified = false;
      state.isInitialized = true;
    },
  },
})

export const { setUser, setLoading, setEmailVerified, setInitialized, logout } = authSlice.actions
export default authSlice.reducer 
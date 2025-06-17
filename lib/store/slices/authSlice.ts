"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

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
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  isEmailVerified: false,
}

const serializeUser = (user: User | null): SerializableUser | null => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    emailVerified: user.emailVerified,
    photoURL: user.photoURL,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      const serializedUser = serializeUser(action.payload);
      state.user = serializedUser;
      state.isAuthenticated = !!serializedUser;
      state.isEmailVerified = serializedUser?.emailVerified ?? false;
      state.loading = false;
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
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.isEmailVerified = false;
    },
  },
})

export const { setUser, setLoading, setEmailVerified, logout } = authSlice.actions
export default authSlice.reducer 
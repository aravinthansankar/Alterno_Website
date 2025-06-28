"use client"
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './services/authApi'
import { onboardingApi } from './services/onboardingApi'
import { squareApi } from './services/squareApi'
import { chatbotApi } from './services/chatbotApi'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [onboardingApi.reducerPath]: onboardingApi.reducer,
    [squareApi.reducerPath]: squareApi.reducer,
    [chatbotApi.reducerPath]: chatbotApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          '__rtkq/focused', 
          '__rtkq/unfocused',
          'onboardingApi/executeQuery/fulfilled',
          'onboardingApi/executeMutation/fulfilled',
          'chatbotApi/executeMutation/fulfilled'
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'payload.timestamp', 
          'meta.arg', 
          'payload.arg',
          'payload.createdAt',
          'payload.updatedAt',
          'payload.storeData.createdAt',
          'payload.storeData.updatedAt',
          'payload.0.createdAt',
          'payload.0.updatedAt',
          'payload.0.storeData.createdAt',
          'payload.0.storeData.updatedAt',
          'payload.*.createdAt',
          'payload.*.updatedAt',
          'payload.*.storeData.createdAt',
          'payload.*.storeData.updatedAt',
          'meta.baseQueryMeta.request',
          'meta.baseQueryMeta.response'
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'auth.loading',
          `${authApi.reducerPath}.queries`,
          `${authApi.reducerPath}.mutations`,
          `${onboardingApi.reducerPath}.queries`,
          `${onboardingApi.reducerPath}.mutations`,
          `${chatbotApi.reducerPath}.queries`,
          `${chatbotApi.reducerPath}.mutations`,
        ],
      },
    }).concat(authApi.middleware, onboardingApi.middleware, squareApi.middleware, chatbotApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
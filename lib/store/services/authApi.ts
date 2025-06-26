"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { auth } from '@/lib/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from 'firebase/auth'

interface SignUpRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface SignInRequest {
  email: string
  password: string
}

interface SerializableUser {
  uid: string
  email: string | null
  displayName: string | null
  emailVerified: boolean
  photoURL: string | null
}

interface AuthResponse {
  user: SerializableUser
}

const serializeUser = (userCredential: UserCredential): AuthResponse => {
  const { user } = userCredential;
  return {
    user: {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    },
  };
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      queryFn: async ({ email, password, firstName, lastName }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          await updateProfile(userCredential.user, {
            displayName: `${firstName} ${lastName}`,
          })
          return { data: serializeUser(userCredential) }
        } catch (error: any) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
    }),
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          return { data: serializeUser(userCredential) }
        } catch (error: any) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
    }),
    signOut: builder.mutation<boolean, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: true };
        } catch (error: any) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } = authApi 
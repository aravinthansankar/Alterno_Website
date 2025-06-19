import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { db } from '@/lib/firebase'
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { OnboardingData } from '@/lib/types/onboarding'

interface CreateStoreRequest {
  userId: string
  storeData: OnboardingData
}

interface UpdateStoreRequest {
  userId: string
  storeId: string
  storeData: Partial<OnboardingData>
}

interface StoreResponse {
  id: string
  userId: string
  storeData: OnboardingData
  createdAt: Date
  updatedAt: Date
}

// Helper function to convert Firebase data to serializable format
const convertFirebaseData = (data: any): any => {
  if (data && typeof data === 'object') {
    // Convert Firebase Timestamps to Date objects
    if (data.seconds !== undefined && data.nanoseconds !== undefined) {
      return new Date(data.seconds * 1000 + data.nanoseconds / 1000000);
    }
    
    // Recursively convert nested objects
    const converted: any = {};
    for (const [key, value] of Object.entries(data)) {
      converted[key] = convertFirebaseData(value);
    }
    
    // Ensure selectedServices is always an array
    if (converted.selectedServices && !Array.isArray(converted.selectedServices)) {
      converted.selectedServices = [];
    }
    
    return converted;
  }
  return data;
};

export const onboardingApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Store'],
  endpoints: (builder) => ({
    createStore: builder.mutation<StoreResponse, CreateStoreRequest>({
      queryFn: async ({ userId, storeData }) => {
        try {
          console.log("API: Creating store for userId:", userId);
          console.log("API: Store data:", storeData);
          
          // Ensure selectedServices is an array
          const processedStoreData = {
            ...storeData,
            selectedServices: Array.isArray(storeData.selectedServices) 
              ? storeData.selectedServices 
              : [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          
          const storeRef = collection(db, 'users', userId, 'stores')
          console.log("API: Collection reference created");
          
          const docRef = await addDoc(storeRef, processedStoreData)
          
          console.log("API: Document created with ID:", docRef.id);
          
          const newStore: StoreResponse = {
            id: docRef.id,
            userId,
            storeData: processedStoreData,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          
          console.log("API: Returning store response:", newStore);
          return { data: newStore }
        } catch (error: any) {
          console.error("API: Error creating store:", error);
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Store'],
    }),
    
    getUserStores: builder.query<StoreResponse[], string>({
      queryFn: async (userId) => {
        try {
          const storesRef = collection(db, 'users', userId, 'stores')
          const querySnapshot = await getDocs(storesRef)
          
          const stores: StoreResponse[] = []
          querySnapshot.forEach((doc) => {
            const data = convertFirebaseData(doc.data())
            stores.push({
              id: doc.id,
              userId,
              storeData: data as OnboardingData,
              createdAt: data.createdAt || new Date(),
              updatedAt: data.updatedAt || new Date(),
            })
          })
          
          return { data: stores }
        } catch (error: any) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      providesTags: ['Store'],
    }),
    
    updateStore: builder.mutation<StoreResponse, UpdateStoreRequest>({
      queryFn: async ({ userId, storeId, storeData }) => {
        try {
          const storeRef = doc(db, 'users', userId, 'stores', storeId)
          await updateDoc(storeRef, {
            ...storeData,
            updatedAt: new Date(),
          })
          
          const updatedStore: StoreResponse = {
            id: storeId,
            userId,
            storeData: storeData as OnboardingData,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          
          return { data: updatedStore }
        } catch (error: any) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Store'],
    }),
    
    deleteStore: builder.mutation<void, { userId: string; storeId: string }>({
      queryFn: async ({ userId, storeId }) => {
        try {
          const storeRef = doc(db, 'users', userId, 'stores', storeId)
          await deleteDoc(storeRef)
          return { data: undefined }
        } catch (error: any) {
          return { error: { status: 'CUSTOM_ERROR', error: error.message } }
        }
      },
      invalidatesTags: ['Store'],
    }),
  }),
})

export const {
  useCreateStoreMutation,
  useGetUserStoresQuery,
  useUpdateStoreMutation,
  useDeleteStoreMutation,
} = onboardingApi 
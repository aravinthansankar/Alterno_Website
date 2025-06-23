import { createApi } from '@reduxjs/toolkit/query/react'
import { ClientSessionManager } from '@/lib/square/clientSessionManager'
import { auth } from '@/lib/firebase'

interface LocationAddress {
  address_line_1?: string;
  address_line_2?: string;
  locality?: string;
  administrative_district_level_1?: string;
  postal_code?: string;
}

interface BusinessHoursPeriod {
  day_of_week?: string;
  start_local_time?: string;
  end_local_time?: string;
}

interface BusinessHours {
  periods?: BusinessHoursPeriod[];
}

export interface SquareLocation {
  id: string;
  name: string;
  business_name?: string;
  address?: LocationAddress;
  timezone?: string;
  phone_number?: string;
  business_hours?: BusinessHours;
  status?: string;
  currency?: string;
  country?: string;
  mcc?: string;
  type?: string;
}

export interface GetLocationsResponse {
  location?: SquareLocation; // when single
  locations?: SquareLocation[]; // when list
}

export const squareApi = createApi({
  reducerPath: 'squareApi',
  baseQuery: async () => ({ data: {} }), // we will use queryFn instead
  endpoints: (builder) => ({
    getLocations: builder.query<GetLocationsResponse, void>({
      async queryFn() {
        try {
          const connection = ClientSessionManager.getSquareConnection()
          if (!connection?.merchantId) {
            return { error: { status: 'NO_MERCHANT', error: 'Square not connected' } } as any
          }
          const idToken = await auth.currentUser?.getIdToken()
          if (!idToken) {
            return { error: { status: 'NO_AUTH', error: 'User not authenticated' } } as any
          }
          const res = await fetch('/api/square/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              merchantId: connection.merchantId,
              endpoint: '/v2/locations',
            }),
          })

          if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            return { error: { status: res.status, error: err } } as any
          }

          const data = await res.json()
          return { data } as any
        } catch (err: any) {
          return { error: { status: 'FETCH_ERROR', error: err.message || 'Unknown error' } } as any
        }
      },
    }),
  }),
})

export const { useGetLocationsQuery: useGetSquareLocationsQuery } = squareApi 
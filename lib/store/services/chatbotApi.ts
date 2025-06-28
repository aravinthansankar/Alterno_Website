import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ChatMessage {
  type: string;
  sessionId: string;
  userId?: string;
}

interface ChatResponse {
  output: string;
}

export const chatbotApi = createApi({
  reducerPath: 'chatbotApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://primary-prod-dd85.up.railway.app/webhook/chat',
  }),
  tagTypes: ['Chat'],
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse[], ChatMessage>({
      query: (message) => ({
        url: 'chat',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: message,
      }),
      // Transform the response to handle the array format
      transformResponse: (response: ChatResponse[]) => {
        return response;
      },
      // Invalidate chat cache when new message is sent
      invalidatesTags: ['Chat'],
    }),
    
    // Optional: Get chat history if you want to implement it later
    getChatHistory: builder.query<ChatResponse[], void>({
      query: () => 'chat-history',
      providesTags: ['Chat'],
    }),
  }),
});

export const { 
  useSendMessageMutation,
  useGetChatHistoryQuery 
} = chatbotApi; 
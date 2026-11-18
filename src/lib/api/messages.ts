// Messages API module
import { api } from './client';
import type { Message, MessageCreate } from '@/types';

export const messagesApi = {
  // GET /messages/ — authenticated, get conversations
  getAll: async (): Promise<Message[]> => {
    return api.get<Message[]>('/messages/');
  },

  // GET /messages/conversation/{user_id}
  getConversation: async (userId: number): Promise<Message[]> => {
    return api.get<Message[]>(`/messages/conversation/${userId}`);
  },

  // POST /messages/
  send: async (data: MessageCreate): Promise<Message> => {
    return api.post<Message>('/messages/', data);
  },
};

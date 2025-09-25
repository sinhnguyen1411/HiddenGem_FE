import apiClient from './api';
import { ChatSendRequest } from './types';

export interface ChatMessage {
  id: number;
  noi_dung: string;
  from_user_id: number;
  to_user_id?: number;
  created_at: string;
}

export interface MessagesListResponse {
  data: ChatMessage[];
}

export interface ConversationsListResponse {
  data: Array<{ with_user_id: number; last_message?: ChatMessage }>;
}

class ChatService {
  send(payload: ChatSendRequest): Promise<void> {
    return apiClient.post<void>('/chat/send', payload);
  }

  messages(params?: { with?: number; limit?: number; offset?: number }): Promise<MessagesListResponse> {
    return apiClient.get<MessagesListResponse>('/chat/messages', params);
  }

  conversations(): Promise<ConversationsListResponse> {
    return apiClient.get<ConversationsListResponse>('/chat/conversations');
  }
}

export const chatService = new ChatService();
export default chatService;



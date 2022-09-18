import { CreateConversationParams } from 'src/utils/types';

export interface IConversationsService {
  createConversation(conversationDetails: CreateConversationParams);
}

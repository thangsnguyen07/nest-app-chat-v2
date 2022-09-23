import { Conversation, User } from 'src/utils/typeorm/entities';
import { CreateConversationParams } from 'src/utils/types';

export interface IConversationsService {
  createConversation(user: User, conversationDetails: CreateConversationParams);
  getConversations(id: number): Promise<Conversation[]>;
  findConversationById(id: number): Promise<Conversation>;
}

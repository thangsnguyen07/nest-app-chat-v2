import { Message, User } from 'src/utils/typeorm/entities';
import { CreateMessageParams } from 'src/utils/types';

export interface IMessagesService {
  createMessage(messageDetails: CreateMessageParams): Promise<Message>;
  getMessagesFromConversations(conversationId: number): Promise<Message[]>;
}

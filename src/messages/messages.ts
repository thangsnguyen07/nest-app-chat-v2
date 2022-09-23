import { Message } from 'src/utils/typeorm/entities';
import { CreateMessageParams } from 'src/utils/types';

export interface IMessagesService {
  createMessage(messageDetails: CreateMessageParams): Promise<Message>;
}

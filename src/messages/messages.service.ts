import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/utils/typeorm/entities';
import { CreateMessageParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IMessagesService } from './messages';

@Injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}
  async createMessage(params: CreateMessageParams): Promise<Message> {
    const { user, content, conversationId } = params;
    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId,
      },
      relations: ['creator', 'recipient'],
    });

    if (!conversation)
      throw new HttpException(
        'Conversation not found.',
        HttpStatus.BAD_REQUEST,
      );

    if (
      conversation.creator.id !== user.id &&
      conversation.recipient.id !== user.id
    )
      throw new HttpException('Cannot create message.', HttpStatus.FORBIDDEN);

    const newMessage = this.messageRepository.create({
      content,
      conversation,
      author: user,
    });

    const savedMessage = await this.messageRepository.save(newMessage);
    conversation.lastMessage = savedMessage;
    await this.conversationRepository.save(conversation);
    return;
  }

  async getMessagesFromConversations(
    conversationId: number,
  ): Promise<Message[]> {
    return this.messageRepository.find({
      where: { conversation: { id: conversationId } },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserService } from 'src/user/user';
import { Services } from 'src/utils/constants';
import { Conversation, User } from 'src/utils/typeorm/entities';
import { CreateConversationParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IConversationsService } from './conversations';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.USER)
    private readonly userService: IUserService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async createConversation(
    user: User,
    createConversationParams: CreateConversationParams,
  ) {
    const { recipientId } = createConversationParams;

    if (user.id === recipientId)
      throw new HttpException(
        'Cannot Create Conversation',
        HttpStatus.BAD_REQUEST,
      );

    const existingConversation = await this.conversationRepository.findOne({
      where: [
        {
          creator: { id: user.id },
          recipient: { id: recipientId },
        },
        {
          creator: { id: recipientId },
          recipient: { id: user.id },
        },
      ],
    });

    if (existingConversation)
      throw new HttpException('Conversation exists', HttpStatus.CONFLICT);

    const recipient = await this.userService.findUser({ id: recipientId });
    if (!recipient)
      throw new HttpException('Recipient not found', HttpStatus.BAD_REQUEST);

    const conversation = this.conversationRepository.create({
      creator: user,
      recipient: recipient,
    });
    return this.conversationRepository.save(conversation);
  }

  findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne({
      where: { id },
      relations: [
        'creator',
        'recipient',
        'lastMessage',
        'messages',
        'messages.author',
      ],
    });
  }

  getConversations(id: number): Promise<Conversation[]> {
    return (
      this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoin('conversation.creator', 'creator')
        .addSelect([
          'creator.id',
          'creator.firstName',
          'creator.lastName',
          'creator.email',
        ])
        .leftJoin('conversation.recipient', 'recipient')
        .addSelect([
          'recipient.id',
          'recipient.firstName',
          'recipient.lastName',
          'recipient.email',
        ])
        // .leftJoin('conversation.lastMessage', 'lastMessage')
        // .addSelect(['lastMessage.id'])
        .where('creator.id = :id', { id })
        .orWhere('recipient.id = :id', { id })
        .orderBy('conversation.id', 'DESC')
        .getMany()
    );
  }
}

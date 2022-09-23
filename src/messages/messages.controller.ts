import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm/entities';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { IMessagesService } from './messages';

@Controller('messages')
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGE)
    private readonly messagesService: IMessagesService,
  ) {}

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.createMessage({ user, ...createMessageDto });
  }
}

import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/utils/auth.guard';
import { Routes, Services } from 'src/utils/constants';
import { IConversationsService } from './conversations';
import { CreateConversationDto } from './dtos/CreateConversation.dto';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticationGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationsService,
  ) {}

  @Post()
  createConversation(@Body() createConversationPayload: CreateConversationDto) {
    this.conversationsService.createConversation(createConversationPayload);
  }
}

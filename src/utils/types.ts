import { User } from './typeorm';

export type CreateUserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserCredential = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

export type CreateConversationParams = {
  recipientId: number;
  message: string;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}

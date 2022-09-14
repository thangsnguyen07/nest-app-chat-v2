import { User } from 'src/utils/typeorm';
import { UserCredential } from 'src/utils/types';

export interface IAuthService {
  validateUser(userCredential: UserCredential): Promise<User | null>;
}

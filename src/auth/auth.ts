import { UserCredential } from 'src/utils/types';

export interface IAuthService {
  validateUser(userCredential: UserCredential);
}

import { User } from 'src/utils/typeorm/entities';
import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types';

export interface IUserService {
  createUser(createUserDetails: CreateUserDetails): Promise<User>;
  findUser(
    findUserParams: FindUserParams,
    options?: FindUserOptions,
  ): Promise<User>;
}

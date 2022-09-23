import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { User } from 'src/utils/typeorm/entities';
import {
  CreateUserDetails,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: CreateUserDetails): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email: userDetails.email,
    });

    if (user)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);

    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password,
    });

    return this.userRepository.save(newUser);
  }

  async findUser(
    findUserParams: FindUserParams,
    options?: FindUserOptions,
  ): Promise<User> {
    const selections: (keyof User)[] = ['email', 'firstName', 'lastName', 'id'];
    const selectionsWithPassword: (keyof User)[] = [...selections, 'password'];

    return this.userRepository.findOne({
      where: findUserParams,
      select: options?.selectAll ? selectionsWithPassword : selections,
    });
  }
}

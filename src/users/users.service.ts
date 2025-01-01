import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {

  constructor(
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User | null> {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user);
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.usersRepository.findOneBy({id}).then((user) => {
      if (!user) {
        return null;
      }
      Object.assign(user, updateUserDto);
      return this.usersRepository.save(user);
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

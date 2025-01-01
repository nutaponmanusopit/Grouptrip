import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class GroupsService {
  @InjectRepository(Group)
  private readonly groupsRepository: Repository<Group>;

  @Inject()
  private readonly usersService: UsersService;

  create(createGroupDto: CreateGroupDto): Promise<Group | null> {
    const group = this.groupsRepository.create(createGroupDto);
    return this.groupsRepository.save(group);
  }

  async createUser(id: number, createUserDto: CreateUserDto) {
    const group = await this.groupsRepository.findOne({
      where: { id: id },
      relations: ['users'],
    });
    if (!group) {
      return null;
    }
    const user = await this.usersService.create(createUserDto);
    group.users = group.users == null ? [user] : [...group.users, user];
    await this.groupsRepository.save(group);
  }

  async findOne(id: number): Promise<User[] | null> {
    const group = await this.groupsRepository.findOne({
      where: { id: id },
      relations: ['users'],
    });

    return group.users;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupsRepository.findOneBy({ id });
    if (!group) {
      return null;
    }
    Object.assign(group, updateGroupDto);
    return await this.groupsRepository.save(group);
  }

  async remove(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}

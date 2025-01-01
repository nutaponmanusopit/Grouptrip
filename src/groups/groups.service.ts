import {Inject, Injectable, Logger} from '@nestjs/common';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {Group} from "./entities/group.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class GroupsService {

  @InjectRepository(Group)
  private readonly groupsRepository: Repository<Group>

  @Inject()
  private readonly usersService: UsersService

  create(createGroupDto: CreateGroupDto): Promise<Group | null> {
    const group = this.groupsRepository.create(createGroupDto)
    return this.groupsRepository.save(group);
  }

  createUser(id: number, createUserDto: CreateUserDto) {
    return this.findOne(id).then(async (group) => {
      if (!group) {
        return null;
      }
      const user = await this.usersService.create(createUserDto)
      group.users = group.users == null ? [user] : [...group.users, user];
      await this.groupsRepository.save(group)
    })
  }


  async findOne(id: number): Promise<Group | null>{
    return await this.groupsRepository.findOne({
      where: { id: id },
      relations: ['users'],
    })
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.groupsRepository.findOneBy({id}).then((group) => {
      if (!group) {
        return null;
      }
      Object.assign(group, updateGroupDto);
      return this.groupsRepository.save(group);
    });
  }

  async remove(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }
}

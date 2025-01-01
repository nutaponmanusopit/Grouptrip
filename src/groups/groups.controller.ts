import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('group')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Post(':id')
  createUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return this.groupsService.createUser(+id, createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }

  @Get(':id/users')
  findAllUsers(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Get(':id/transactions')
  findAllTransactions(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }
}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Group} from "../groups/entities/group.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([User, Group]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

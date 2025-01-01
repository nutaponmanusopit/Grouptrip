import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Group} from "./entities/group.entity";
import {UsersModule} from "../users/users.module";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([Group, User]),
      UsersModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}

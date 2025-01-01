import {Column, PrimaryGeneratedColumn, OneToMany, Entity, JoinColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity('Groups')
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.group)
    @JoinColumn()
    users: User[];
}

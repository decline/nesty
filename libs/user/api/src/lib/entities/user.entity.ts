import { User as UserInterface } from '@nesty/user/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  constructor(userName: string, password: string, firstName: string, lastName: string, isActive = true) {
    this.userName = userName;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
  }
}

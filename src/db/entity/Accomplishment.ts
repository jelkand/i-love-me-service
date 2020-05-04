import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Accomplishment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @ManyToOne(() => User, user => user.accomplishments)
  user!: User

  @Column()
  text!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

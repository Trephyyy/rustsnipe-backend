import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'bigint' })
  steamId: number;

  @Column()
  username: string;

  @Column()
  avatar: string;

  @Column({ default: false })
  isAdmin?: boolean;
}

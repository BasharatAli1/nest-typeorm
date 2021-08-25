import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FeedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // ceatedAt: Date;
  @CreateDateColumn()
  createdAt: Date;
}

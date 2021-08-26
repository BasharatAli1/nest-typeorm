import { UserEntity } from 'src/auth/model/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne(
    () => UserEntity,
    (userEntity) => {
      userEntity.feedPosts;
      cascade: true;
      // update: false;
    },
  )
  author: UserEntity;
}

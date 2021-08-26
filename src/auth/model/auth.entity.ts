import { FeedEntity } from 'src/feed/model/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(
    () => FeedEntity,
    (feedEntity) => {
      feedEntity.author;
      cascade: true;
      // update: false;
    },
  )
  feedPosts: FeedEntity[];
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from './controller/feed.controller';
import { FeedService } from './services/feed.service';
import { FeedEntity } from './model/post.entity';
import { UserEntity } from 'src/auth/model/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}

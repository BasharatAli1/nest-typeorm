import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedController } from './controller/feed.controller';
import { FeedService } from './services/feed.service';
import { FeedEntity } from './model/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}

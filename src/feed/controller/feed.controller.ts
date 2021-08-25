import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Feed } from '../model/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  // @Get()
  // findAll(): Promise<Feed[]> {
  //   return this.feedService.findAllPosts();
  // }

  @Get()
  findSelecte(
    // @Query('take') take: number,
    // @Query('skip') skip: number,
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Promise<Feed[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }

  // @Get(':id')
  // findOne(@Param() params): string {
  //   return this.feedService.getOne(params.id);
  // }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Feed> {
    return this.feedService.getOne(id);
  }

  @Post()
  create(@Body() post: Feed): Observable<Feed> {
    return this.feedService.createPost(post);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: Feed,
  ): Promise<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }
  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}

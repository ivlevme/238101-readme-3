import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto';
import { CommentsRepository } from './repositories';
import { CommentEntity } from './entities';
import { CommentMessage } from './consts';
import { CommentsQuery } from '@project/shared/shared-types';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity({ ...dto, authorId: '123' });
    return this.commentsRepository.create(commentEntity);
  }

  async getAllComentsByPublication(
    publicationId: number,
    commentsQuery: CommentsQuery
  ) {
    return this.commentsRepository.findByPublication(
      publicationId,
      commentsQuery
    );
  }

  async getCommentById(commentId: number) {
    const comment = this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new NotFoundException(CommentMessage.NotFound);
    }

    return comment;
  }

  async deleteComment(commentId: number) {
    const comment = await this.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundException(CommentMessage.NotFound);
    }

    return this.commentsRepository.destroy(commentId);
  }
}

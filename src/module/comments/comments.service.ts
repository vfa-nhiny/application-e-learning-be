import { Model } from "mongoose";
import * as crypto from "crypto";
import { Injectable } from "@nestjs/common";
import { Comment } from "./interfaces/comment.interface";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentLessonDto } from "./dto/comment-lesson.dto";
import { UpdateCommentLessonDto } from "./dto/update-comment-lesson.dto";
import { User } from "../users/interfaces/user.interface";

@Injectable()
export class CommentsService {
  constructor(@InjectModel("Comment") private readonly commentModel: Model<Comment>, @InjectModel("User") private readonly userModel: Model<User>) {}

  public async createNewComment(newComment: CreateCommentDto): Promise<Comment> {
    const commentDto = new this.commentModel(newComment);
    return await commentDto.save();
  }

  public async getCommentOfLesson(lessonId: string): Promise<Comment> {
    const commentDtoFromDb = await this.commentModel.findOne({ lessonId: lessonId });
    return commentDtoFromDb;
  }

  public async getCommentOfLessonHaveUsername(lessonId: string) {
    const commentDtoFromDb = await this.commentModel.findOne({ lessonId: lessonId });
    if (!commentDtoFromDb) return null;
    const commentWithUsername = await commentDtoFromDb.comment.map(async data => {
      const user = await this.userModel.findOne({ userId: data.userId });
      return {
        ...data,
        username: user.name,
      };
    });

    return commentWithUsername;
  }

  public async createNewCommentLesson(lessonId: string, newCommentLesson: UpdateCommentLessonDto): Promise<Comment> {
    const commentDto = await this.getCommentOfLesson(lessonId);
    commentDto.comment.push({ commentId: crypto.randomUUID(), ...newCommentLesson });
    return await commentDto.save();
  }
}

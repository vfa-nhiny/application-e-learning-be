import { Injectable } from "@nestjs/common";
import { Course } from "../courses/interfaces/course.interface";
import { Rate } from "../rates/interfaces/rate.interface";
import { RedisService } from "nestjs-redis";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class RecommendationService {
  private redisClient;

  constructor(
    @InjectModel("Course") private readonly courseModel: Model<Course>,
    @InjectModel("Rate") private readonly rateModel: Model<Rate>,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient();
  }

  async getUserRatings(userId: string): Promise<Record<string, Record<string, number>>> {
    const userRatings: Record<string, Record<string, number>> = {};

    const ratings = await this.rateModel.find({ userId }).exec();

    for (const rating of ratings) {
      if (!userRatings[rating.userId]) {
        userRatings[rating.userId] = {};
      }

      userRatings[rating.userId][rating.courseId] = rating.score;
    }

    return userRatings;
  }
  async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseModel.find().exec();
    return courses;
  }

  async getUserSimilarityMatrix(): Promise<Record<string, Record<string, number>>> {
    const userSimilarityMatrix = {};

    const similarityMatrix = await this.redisClient.hgetall("userSimilarity");

    for (const user1 in similarityMatrix) {
      if (!userSimilarityMatrix[user1]) {
        userSimilarityMatrix[user1] = {};
      }

      for (const user2 in similarityMatrix[user1]) {
        const similarity = parseFloat(similarityMatrix[user1][user2]);
        userSimilarityMatrix[user1][user2] = similarity;
      }
    }

    return userSimilarityMatrix;
  }

  train(data: { courses: Course[]; rates: Rate[] }): void {
    const { courses, rates } = data;

    // Tạo ma trận đánh giá người dùng cho khóa học
    const userRatings = this.prepareUserRatings(courses, rates);

    // Tính toán ma trận tương đồng người dùng
    const userSimilarityMatrix = this.calculateUserSimilarityMatrix(userRatings);

    // Lưu trữ ma trận tương đồng người dùng và ma trận đánh giá người dùng để sử dụng sau này
    // Có thể sử dụng Redis hoặc một cơ sở dữ liệu khác để lưu trữ ma trận này
    this.saveUserSimilarityMatrix(userSimilarityMatrix);
    this.saveUserRatings(userRatings);
  }

  private prepareUserRatings(courses: Course[], rates: Rate[]): Record<string, Record<string, number>> {
    const userRatings: Record<string, Record<string, number>> = {};

    for (const rate of rates) {
      if (!userRatings[rate.userId]) {
        userRatings[rate.userId] = {};
      }

      const course = courses.find(c => c.courseId === rate.courseId);
      if (course) {
        userRatings[rate.userId][rate.courseId] = rate.score;
      }
    }

    return userRatings;
  }

  recommendCoursesForUser(
    userId: string,
    courses: Course[],
    userRatings: Record<string, Record<string, number>>,
    userSimilarityMatrix: Record<string, Record<string, number>>,
  ): Course[] {
    const userCourses = userRatings[userId];
    const similarUsers = userSimilarityMatrix[userId];

    const recommendedCourses: Course[] = [];

    for (const user in similarUsers) {
      if (user !== userId) {
        const similarity = similarUsers[user];
        const ratedCourses = userRatings[user];

        for (const courseId in ratedCourses) {
          if (!userCourses.hasOwnProperty(courseId) && ratedCourses[courseId] > 0) {
            const course = courses.find(c => c.courseId === courseId);

            if (course && course.isPublished && course.joinNumber > 0) {
              // Áp dụng trọng số similarity vào đề xuất khóa học
              course.recommendationScore = similarity * ratedCourses[courseId];
              recommendedCourses.push(course);
            }
          }
        }
      }
    }

    // Sắp xếp các khóa học đề xuất theo điểm số recommendationScore giảm dần
    recommendedCourses.sort((a, b) => b.recommendationScore - a.recommendationScore);

    // Trả về danh sách khóa học đề xuất
    return recommendedCourses;
  }

  private calculateUserSimilarityMatrix(userRatings: Record<string, Record<string, number>>): Record<string, Record<string, number>> {
    const userSimilarityMatrix: Record<string, Record<string, number>> = {};

    for (const user1 in userRatings) {
      if (!userSimilarityMatrix[user1]) {
        userSimilarityMatrix[user1] = {};
      }

      for (const user2 in userRatings) {
        if (!userSimilarityMatrix[user2]) {
          userSimilarityMatrix[user2] = {};
        }

        if (user1 !== user2) {
          const similarity = this.calculateUserSimilarity(userRatings[user1], userRatings[user2]);
          userSimilarityMatrix[user1][user2] = similarity;
          userSimilarityMatrix[user2][user1] = similarity;
        } else {
          userSimilarityMatrix[user1][user2] = 1;
        }
      }
    }

    return userSimilarityMatrix;
  }

  private calculateUserSimilarity(ratings1: Record<string, number>, ratings2: Record<string, number>): number {
    const sharedItems: string[] = [];

    // Tìm các mục mà cả hai người dùng đã đánh giá
    for (const item in ratings1) {
      if (ratings2.hasOwnProperty(item)) {
        sharedItems.push(item);
      }
    }

    // Nếu không có mục chung nào, trả về 0 tức là không có độ tương đồng
    if (sharedItems.length === 0) {
      return 0;
    }

    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    // Tính toán dot product và magnitude của hai vector đánh giá
    for (const item of sharedItems) {
      const rating1 = ratings1[item];
      const rating2 = ratings2[item];

      dotProduct += rating1 * rating2;
      magnitude1 += rating1 * rating1;
      magnitude2 += rating2 * rating2;
    }

    // Tính toán cosine similarity
    const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));

    // Trả về giá trị độ tương đồng giữa hai người dùng
    return similarity;
  }

  private saveUserSimilarityMatrix(userSimilarityMatrix: Record<string, Record<string, number>>): void {
    for (const user1 in userSimilarityMatrix) {
      for (const user2 in userSimilarityMatrix[user1]) {
        const similarity = userSimilarityMatrix[user1][user2];

        // Lưu trữ độ tương đồng giữa user1 và user2 trong Redis
        this.redisClient.hset("userSimilarity", `${user1}:${user2}`, similarity);
      }
    }
  }

  private saveUserRatings(userRatings: Record<string, Record<string, number>>): void {
    for (const user in userRatings) {
      for (const course in userRatings[user]) {
        const rating = userRatings[user][course];

        // Lưu trữ đánh giá của user cho course trong Redis
        this.redisClient.hset("userRatings", `${user}:${course}`, rating);
      }
    }
  }
}

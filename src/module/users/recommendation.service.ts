import { Injectable } from "@nestjs/common";
import { Course } from "../courses/interfaces/course.interface";
import { Rate } from "../rates/interfaces/rate.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class RecommendationService {
  constructor(@InjectModel("Course") private readonly courseModel: Model<Course>, @InjectModel("Rate") private readonly rateModel: Model<Rate>) {}

  async getUserRatings(courses: Course[], rates: Rate[], userId: string): Promise<Record<string, Record<string, number>>> {
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
  async getAllCourses(): Promise<Course[]> {
    const courses = await this.courseModel.find().exec();
    return courses;
  }

  async getAllRating(): Promise<Rate[]> {
    const rates = await this.rateModel.find().exec();
    return rates;
  }

  splitToObject = inputObj => {
    const result = {};

    for (const key in inputObj) {
      const [userId1, userId2] = key.split(":");
      const score = parseFloat(inputObj[key]);

      if (!result[userId1]) {
        result[userId1] = {};
      }

      result[userId1][userId2] = score;
    }

    return result;
  };

  train(data: { courses: Course[]; rates: Rate[] }) {
    const { courses, rates } = data;

    // Tạo ma trận đánh giá người dùng cho khóa học
    const userRatings = this.prepareUserRatings(courses, rates);

    // Tính toán ma trận tương đồng người dùng
    const userSimilarityMatrix = this.calculateUserSimilarityMatrix(userRatings);

    return {
      userSimilarityMatrix: userSimilarityMatrix,
      userRatings: userRatings,
    };
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
    // Get list of unique user IDs
    const userIds = Object.keys(userRatings);

    // Get list of unique course IDs
    const courseIds = Object.values(userRatings)
      .map(courseObj => Object.keys(courseObj))
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index);

    for (const userId of userIds) {
      for (const courseId of courseIds) {
        if (userRatings[userId][courseId]) {
          userRatings[userId][courseId] = userRatings[userId][courseId];
        } else {
          userRatings[userId][courseId] = 0;
        }
      }
    }

    for (const userId of userIds) {
      const avg = this.calculateAverageRating(userRatings, userId);
      console.log(avg);
      for (const courseId of courseIds) {
        if (userRatings[userId][courseId] !== 0) {
          userRatings[userId][courseId] = userRatings[userId][courseId] - avg;
        }
      }
    }

    return userRatings;
  }

  calculateAverageRating = (userRatings, userId) => {
    const userRatingsForUser = userRatings[userId];

    if (!userRatingsForUser || Object.keys(userRatingsForUser).length === 0) {
      return 0; // If user has no ratings or does not exist, return 0.
    }

    const ratingValues = Object.values(userRatingsForUser);
    const sum = ratingValues.reduce((acc, rating) => Number(acc) + Number(rating), 0);
    const average = Number(sum) / ratingValues.length;

    return average;
  };

  async recommendCoursesForUser(
    userId: string,
    courses: Course[],
    userRatings: Record<string, Record<string, number>>,
    userCourseRatings: Record<string, Record<string, number>>,
    userSimilarityMatrix: Record<string, Record<string, number>>,
  ): Promise<Course[]> {
    const userCourses = userRatings[userId];
    let recommendedCourses: Course[] = [];

    const userIds = Object.keys(userCourseRatings);

    // Get list of unique course IDs
    const courseIds = Object.values(userCourseRatings)
      .map(courseObj => Object.keys(courseObj))
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index);

    for (const courseId of courseIds) {
      if (!userCourses.hasOwnProperty(courseId)) {
        console.log("course misss:", courseId);
        let max1 = -2;
        let userIdMax1 = "";
        let max2 = -2;
        let userIdMax2 = "";
        for (const userIdItem of userIds) {
          if (userIdItem !== userId) {
            const listRateUserIdItem = userRatings[userIdItem];
            if (listRateUserIdItem.hasOwnProperty(courseId)) {
              const rating = userSimilarityMatrix[userIdItem][userId];
              console.log(`rating: ${rating}`);
              if (rating > max1) {
                // If rating is greater than the current max1, update max1 and move the previous max1 value to max2
                max2 = max1;
                max1 = rating;
                userIdMax1 = userIdItem;
                userIdMax2 = userIdMax1;
              } else if (rating > max2) {
                // If rating is greater than the current max2, update max2
                max2 = rating;
                userIdMax2 = userIdItem;
              }
            }
          }
        }
        console.log("max:", max1, max2);

        userCourseRatings[userId][courseId] = (max1 * userCourseRatings[userIdMax1][courseId] + max2 * userCourseRatings[userIdMax2][courseId]) / (Math.abs(max1) + Math.abs(max2));
        console.log("count:", userCourseRatings[userId][courseId]);
      }
    }

    // Sắp xếp các khóa học đề xuất theo điểm số recommendationScore giảm dần
    userCourseRatings[userId] = Object.fromEntries(Object.entries(userCourseRatings[userId]).sort(([, valueA], [, valueB]) => Number(valueB) - Number(valueA)));

    const courseIdIdRecommends = Object.keys(userCourseRatings[userId]);
    recommendedCourses = await this.courseModel.find({ courseId: courseIdIdRecommends }).exec();
    console.log(courseIdIdRecommends);
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
}

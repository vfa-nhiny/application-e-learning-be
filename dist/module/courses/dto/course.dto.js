"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseDto = void 0;
class CourseDto {
    constructor(object) {
        this.courseId = object.courseId;
        this.title = object.title;
        this.description = object.description;
        this.ratingScore = object.ratingScore;
        this.ratingNumber = object.ratingNumber;
        this.joinNumber = object.joinNumber;
        this.image = object.image;
        this.createdAt = object.createdAt;
        this.updatedAt = object.updatedAt;
        this.category = object.category;
        this.price = object.price;
        this.sale = object.sale;
        this.authorId = object.authorId;
    }
}
exports.CourseDto = CourseDto;
//# sourceMappingURL=course.dto.js.map
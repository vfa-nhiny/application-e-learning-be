"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionDto = void 0;
class SectionDto {
    constructor(object) {
        this.sectionId = object.sectionId;
        this.courseId = object.courseId;
        this.createdAt = object.createdAt;
        this.updatedAt = object.updatedAt;
        this.title = object.title;
        this.order = object.order;
        this.lessons = object.lessons;
    }
}
exports.SectionDto = SectionDto;
//# sourceMappingURL=section.dto.js.map
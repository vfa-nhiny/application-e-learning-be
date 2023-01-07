"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDto = void 0;
class ProfileDto {
    constructor(object) {
        this.email = object.email;
        this.name = object.name;
        this.birthday = object.birthday;
        this.phone = object.phone;
        this.avatar = object.avatar;
        this.gender = object.gender;
        this.isPremium = object.isPremium;
        this.startUsingPremiumDate = object.startUsingPremiumDate;
        this.courseJoined = object.courseJoined;
    }
}
exports.ProfileDto = ProfileDto;
//# sourceMappingURL=profile.dto.js.map
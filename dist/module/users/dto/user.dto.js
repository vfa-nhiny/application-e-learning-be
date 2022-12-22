"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const settings_dto_1 = require("./settings.dto");
class UserDto {
    constructor(object) {
        this.userId = object.userId;
        this.name = object.name;
        this.email = object.email;
        this.phone = object.phone;
        this.birthday = object.birthday;
        this.gender = object.gender;
        this.settings = new settings_dto_1.SettingsDto(object.settings);
        this.avatar = object.avatar;
        this.role = object.role;
        this.isPremium = object.isPremium;
        this.startUsingPremiumDate = object.startUsingPremiumDate;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map
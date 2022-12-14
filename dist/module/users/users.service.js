"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const fs = require("fs");
const constants_1 = require("../auth/constants");
const user_teacher_dto_1 = require("./dto/user-teacher.dto");
const saltRounds = 10;
let UsersService = class UsersService {
    constructor(userModel, courseModel) {
        this.userModel = userModel;
        this.courseModel = courseModel;
    }
    async findAll() {
        return await this.userModel.find().exec();
    }
    async findByEmail(email) {
        return await this.userModel.findOne({ email: email }).exec();
    }
    async findTeacher() {
        const users = await this.userModel.find({ role: constants_1.role.teacher }).exec();
        return users.map(user => new user_teacher_dto_1.UserTeacherDto(user));
    }
    async findByUserId(userId) {
        const userFromDb = await this.userModel.findOne({ userId: userId }).exec();
        if (!userFromDb)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        return userFromDb;
    }
    async createNewUser(newUser) {
        if (newUser.email && newUser.password) {
            const userRegistered = await this.findByEmail(newUser.email);
            if (!userRegistered) {
                newUser.password = await bcrypt.hash(newUser.password, saltRounds);
                const createdUser = new this.userModel(Object.assign({}, newUser));
                createdUser.userId = crypto.randomUUID();
                return await createdUser.save();
            }
            else if (!userRegistered.auth.email.valid) {
                return userRegistered;
            }
            else {
                throw new common_1.HttpException("User already registered", common_1.HttpStatus.FORBIDDEN);
            }
        }
        else {
            throw new common_1.HttpException("Missing mandatory parameters", common_1.HttpStatus.FORBIDDEN);
        }
    }
    async setPassword(email, newPassword) {
        const userFromDb = await this.userModel.findOne({ email: email });
        if (!userFromDb)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        userFromDb.password = await bcrypt.hash(newPassword, saltRounds);
        await userFromDb.save();
        return true;
    }
    async updateProfile(profileDto) {
        console.log(profileDto);
        const userFromDb = await this.userModel.findOne({
            userId: profileDto.userId,
        });
        if (!userFromDb)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        if (profileDto.name)
            userFromDb.name = profileDto.name;
        if (profileDto.phone)
            userFromDb.phone = profileDto.phone;
        if (profileDto.gender)
            userFromDb.gender = profileDto.gender;
        if (profileDto.birthday)
            userFromDb.birthday = profileDto.birthday;
        if (profileDto.avatar)
            userFromDb.avatar = profileDto.avatar;
        if (profileDto.isPremium)
            userFromDb.isPremium = profileDto.isPremium;
        if (profileDto.startUsingPremiumDate)
            userFromDb.startUsingPremiumDate = profileDto.startUsingPremiumDate;
        await userFromDb.save();
        return userFromDb;
    }
    async updateCourse(userId, courseId) {
        const userFromDb = await this.userModel.findOne({
            userId: userId,
        });
        const courseFromDb = await this.courseModel.findOne({ courseId: courseId });
        if (!userFromDb)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        if (!userFromDb.isPremium)
            throw new common_1.HttpException("User not premium", common_1.HttpStatus.NOT_FOUND);
        courseFromDb.joinNumber++;
        userFromDb.courseJoined.push(courseId);
        await userFromDb.save();
        await courseFromDb.save();
        return userFromDb;
    }
    async writeFile(dir, filename, base64Data) {
        return new Promise(function (resolve, reject) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFile(dir + "/" + filename, base64Data, "base64", function (err) {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    }
    async removeFile(dir, filename) {
        return new Promise(function (resolve, reject) {
            if (fs.existsSync(dir)) {
                fs.stat(dir + "/" + filename, function (err, stat) {
                    if (err == null) {
                        fs.unlink(dir + "/" + filename, err => {
                            if (err)
                                reject(err);
                            else
                                resolve(true);
                        });
                    }
                    else if (err.code == "ENOENT") {
                        resolve(true);
                    }
                    else {
                        reject(err);
                    }
                });
            }
        });
    }
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }
    async updateSettings(settingsDto) {
        const userFromDb = await this.userModel.findOne({
            email: settingsDto.email,
        });
        if (!userFromDb)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        userFromDb.settings = userFromDb.settings || {};
        for (const key in settingsDto) {
            if (settingsDto.hasOwnProperty(key) && key != "email") {
                userFromDb.settings[key] = settingsDto[key];
            }
        }
        await userFromDb.save();
        return userFromDb;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("User")),
    __param(1, (0, mongoose_2.InjectModel)("Course")),
    __metadata("design:paramtypes", [mongoose_1.Model, mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
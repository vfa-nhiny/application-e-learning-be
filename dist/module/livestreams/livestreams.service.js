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
exports.LivestreamsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let LivestreamsService = class LivestreamsService {
    constructor(livestreamModel) {
        this.livestreamModel = livestreamModel;
    }
    async findByLivestreamId(userId) {
        const livestreamFromDb = await this.livestreamModel.findOne({ userId: userId }).exec();
        if (!livestreamFromDb)
            throw new common_1.HttpException("Livestream not found", common_1.HttpStatus.NOT_FOUND);
        return livestreamFromDb;
    }
    async createNewLivestream(newLivestream) {
        const livestreamFromDb = await this.livestreamModel.findOne({ userId: newLivestream.userId }).exec();
        if (livestreamFromDb) {
            throw new common_1.HttpException("Livestream already registered", common_1.HttpStatus.FORBIDDEN);
        }
        else {
            const newLivestreamDto = new this.livestreamModel(newLivestream);
            return await newLivestreamDto.save();
        }
    }
    async deleteLivestream(id) {
        const livestreamFromDb = await this.livestreamModel.findOne({ userId: id }).exec();
        if (!livestreamFromDb)
            throw new common_1.HttpException("Livestream not found", common_1.HttpStatus.NOT_FOUND);
        return await livestreamFromDb.remove();
    }
};
LivestreamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Livestream")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LivestreamsService);
exports.LivestreamsService = LivestreamsService;
//# sourceMappingURL=livestreams.service.js.map
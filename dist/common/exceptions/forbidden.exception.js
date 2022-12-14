"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
class ForbiddenException extends common_1.HttpException {
    constructor() {
        super("Forbidden", common_2.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map
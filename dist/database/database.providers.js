"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
exports.databaseProviders = [
    {
        provide: "DATABASE_CONNECTION",
        useFactory: async () => await mongoose.connect(`${process.env.MONGO_CONNECTION}`),
    },
];
//# sourceMappingURL=database.providers.js.map
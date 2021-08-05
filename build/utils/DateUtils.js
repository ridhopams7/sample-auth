"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayDateAsString = void 0;
const moment_1 = __importDefault(require("moment"));
const getTodayDateAsString = () => {
    return moment_1.default().format('YYYYMMDD.HH:mm:ss');
};
exports.getTodayDateAsString = getTodayDateAsString;
//# sourceMappingURL=DateUtils.js.map
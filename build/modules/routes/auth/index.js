"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const utils_1 = require("../../../utils");
const auth_service_1 = __importDefault(require("../../services/auth-service"));
const schema_1 = require("./schema");
exports.default = fastify_plugin_1.default((server, opts, next) => {
    const userService = new auth_service_1.default(server.db);
    server.post('/user/login', { schema: schema_1.LoginTO }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // request.body.ip = request.ip;
            const data = yield userService.userLogin(server, request.body);
            return reply.code(200).send({
                success: true,
                message: 'Successful!',
                // data
            });
        }
        catch (error) {
            utils_1.sendApmError(server, request, error);
            request.log.error(error);
            return reply.code(400).send({
                success: false,
                message: 'error login',
                error
            });
        }
    }));
    server.post('/user/logout', { schema: schema_1.LogoutTO }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log(request.headers);
            yield userService.logOut(server, server.decoded);
            return reply.code(200).send({
                success: true,
                message: 'Successful!'
            });
        }
        catch (error) {
            utils_1.sendApmError(server, request, error);
            request.log.error(error);
            return reply.code(400).send({
                success: false,
                message: 'error logout',
                error
            });
        }
    }));
    next();
});
//# sourceMappingURL=index.js.map
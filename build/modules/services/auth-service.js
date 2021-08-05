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
const models_1 = require("../../plugins/db/models");
// import * as sha256 from "fast-sha256"
const crypto_js_1 = __importDefault(require("crypto-js"));
class AuthService {
    constructor(db) {
        this.userLogin = (server, body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, ip, os, device } = body;
                const cekRedis = yield server.redis.get(username);
                if (cekRedis) {
                    const dataRedis = JSON.parse(cekRedis);
                    const decoded = server.jwt.verify(dataRedis.token);
                    return Object.assign(Object.assign({}, decoded), { token: dataRedis.token });
                }
                const passhash = crypto_js_1.default.SHA256(password).toString(crypto_js_1.default.enc.Hex);
                const verif = yield this.verifyLogin(username, passhash);
                if (verif) {
                    const loginData = {
                        userId: verif.userId,
                        loginTime: new Date(),
                        ip, os, device
                    };
                    //   await this.saveLoginHistory(loginData)
                    //   const profile = await this.getUserProfile({userId: verif.userId})
                    let objJwt = {
                        username,
                        userId: verif.userId,
                        loginTime: new Date(),
                        name: verif.email,
                    };
                    const encoded = yield server.jwt.sign(objJwt);
                    yield server.redis.set(username, JSON.stringify({ username, token: encoded }), "EX", server.conf.expireToken);
                    return Object.assign(Object.assign({}, objJwt), { token: encoded });
                }
                else {
                    throw "username / password tidak ditemukan";
                }
            }
            catch (err) {
                throw err;
            }
        });
        this.verifyLogin = (username, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                let getLogin = yield this.userDb.findOne({ where: { username, password } });
                return getLogin;
            }
            catch (err) {
                throw err;
            }
        });
        this.logOut = (server, body) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = body;
                yield server.redis.del(username);
            }
            catch (err) {
                throw err;
            }
        });
        this.db = db;
        this.userDb = models_1.UserFactory(db);
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth-service.js.map
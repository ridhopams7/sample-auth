import { Sequelize } from 'sequelize/types'
import { UserFactory } from '../../plugins/db/models'
// import * as sha256 from "fast-sha256"
import CryptoJS from 'crypto-js';

export default class AuthService {
    db: Sequelize;
    userDb;

    constructor (db) {
      this.db = db
      this.userDb = UserFactory(db)
    }

    userLogin = async (server: any, body: any) => {
      try {
        const { username,password,ip,os,device } = body

        const cekRedis = await server.redis.get(username)
        if(cekRedis) {
          const dataRedis = JSON.parse(cekRedis)
          const decoded = server.jwt.verify(dataRedis.token)
          return {...decoded, token: dataRedis.token}
        }

        const passhash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)
        const verif = await this.verifyLogin(username,passhash);

        if(verif) {
          const loginData = {
            userId: verif.userId,
            loginTime: new Date(),
            ip,os,device
          }
        //   await this.saveLoginHistory(loginData)
        //   const profile = await this.getUserProfile({userId: verif.userId})
          let objJwt = {
            username,
            userId: verif.userId,
            loginTime: new Date(),
            name: verif.email,
          };
          const encoded = await server.jwt.sign(objJwt)
          await server.redis.set(username,JSON.stringify({ username, token: encoded }), "EX",server.conf.expireToken)
          
          return {...objJwt, token: encoded};
        }else {
          throw "username / password tidak ditemukan"
        }
      } catch (err) {
        throw err
      }
    }

    verifyLogin = async (username,password) => {
      try {
        let getLogin = await this.userDb.findOne({where : {username,password}})
        return getLogin
      }catch (err) {
        throw err
      }
    }

    logOut = async (server,body) => {
      try {
        const { username } = body
        
        await server.redis.del(username)
      } catch (err) {
        throw err
      }
    }
}

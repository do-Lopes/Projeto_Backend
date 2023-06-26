require('dotenv').config();
const userServices = require('../services/userServices')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: process.env.ACESS_TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const estrategia = new Strategy(params, (payload, done) => {
        userServices.getById(payload.id).then(usuario => done(null, usuario ? { ...payload } : false)).catch(err => done(err, false))
    })

    passport.use(estrategia)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false})
    }
}
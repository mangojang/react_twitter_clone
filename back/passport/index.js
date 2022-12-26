const db = require('../models');
const local = require('./local');

module.exports = (passport) => {
    passport.serializeUser((user,done)=>{
        return done(null, user.id);
    });

    passport.deserializeUser(async(id, done)=>{
        try {
            const user = await db.User.findOne({
                where: {id},
            });
            return done(null,user)
        } catch (error) {
            console.log(error);
            return done(error);
        }
    });

    passport.use('local-login', local);

};
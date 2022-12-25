const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt= require('bcrypt');
const passport = require('passport');

router.get('/',(req, res)=>{

});
router.post('/',async(req, res, next)=>{
    try {
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.userId,
            } 
        });
        if(exUser){
            throw new Error("이미 사용중인 아이디 입니다.");
            //return res.status(403).send('이미 사용중인 아이디 입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            nickname:req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });

        console.log(newUser);
        return res.status(200).json(newUser);

    } catch (error) {
        console.log(error);
        return next(error);
    }
});
router.get('/:id',(req, res)=>{

});
router.post('/login',(req, res)=>{
    passport.authenticate('local', (error, user, info)=>{
        if(error){ // 서버 상의 에러
            console.error(error);
            return next(error);
        }

        if(info){ // 로직상의 에러
            return res.status(401).send(info.reason);
        }

        return req.login(user, loginErr=>{
            if(loginErr){
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, user);
            delete filteredUser.password;
            return res.json(user);
        })
    })

});
router.post('/logout',(req, res)=>{

});
router.get('/:id/follow',(req, res)=>{

});
router.post('/:id/follow',(req, res)=>{

});
router.delete('/:id/follow',(req, res)=>{

});
router.delete('/:id/follower',(req, res)=>{

});
router.get('/:id/posts',(req, res)=>{

});

module.exports=router;

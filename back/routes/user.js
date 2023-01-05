const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt= require('bcrypt');
const passport = require('passport');
const { isLoggedIn } = require('./middleware');

router.get('/',isLoggedIn,(req, res)=>{
    const user = Object.assign({},req.user.dataValues);
    delete user.password
    return res.json(user);
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
router.get('/:id', async(req, res, next)=>{
    try {
        const user = await db.User.findAll({
            where:{ id: req.params.id},
            include:[{
                model: db.Post,
                as: 'Post',
                attributes: ['id'],
            },{
                model: db.User,
                as: 'Followings',
                attributes: ['id'],
            },{
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            },],
            attributes: {
                exclude: ['password']
            },
        });

        const jsonUser = user[0].toJSON();
        jsonUser.Posts = jsonUser.Posts? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers? jsonUser.Followers.length : 0;

        return res.json(user);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.post('/login', (req, res, next)=>{
     passport.authenticate('local-login', (error, user, info)=>{
        if(error){ // 서버 상의 에러
            console.error(error);
            return next(error);
        }

        if(info){ // 로직상의 에러
            return res.status(401).send(info);
        }

        return req.login(user, async(loginErr)=>{
            
            if(loginErr){
                return next(loginErr);
            }
            const fullUser = await db.User.findOne({
                where : {id: user.id},
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: db.Post,
                    as: 'Post',
                    attributes: ['id'],
                },{
                    model: db.User,
                    as:'Followings',
                    attributes: ['id'],
                },{
                    model: db.User,
                    as:'Followers',
                    attributes: ['id'],
                }],
                
            })
            console.log(fullUser);
            return res.status(200).json(fullUser);
            
        })
    })(req, res, next)
});
router.post("/logout", (req, res, next) => {
	req.logout((error) => {
        if (error) { return next(error); }
        req.session.destroy((error)=>{
            if(error){return next(error)}
            //클라이언트 측 세션 암호화 쿠키 삭제
            res.cookie('mgck','',{maxAge:0});
            return res.status(200).send("로그아웃 성공");
        });
	});
})
router.get('/:id/follow',(req, res)=>{

});
router.post('/:id/follow',(req, res)=>{

});
router.delete('/:id/follow',(req, res)=>{

});
router.delete('/:id/follower',(req, res)=>{

});
router.get('/:id/posts', async(req, res, next)=>{
    try {
        const posts = await db.Post.findAll({
            where:{
                UserId: parseInt(req.params.id, 10),
                RetweetId: null,
            },
            include:[{
                model: db.User,
                attributes: {
                    exclude: ['password']
                },
            }],
        });
        return res.json(posts);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports=router;

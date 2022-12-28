const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', async(req, res, next)=>{
   
});

router.post('/', async(req, res, next)=>{
    try {
        const hashtag = req.body.content.match( /#[^\s#]+/g);
        let newPost = await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(hashtag){
            const result = await Promise.all(hashtag.map(tag=>db.Hashtag.findOrCreate({
                where: {content: tag.slice(1).toLowerCase()} // #빼고 소문자 만들기 
            })));
            console.log(result);
            await newPost.addHashtags(result.map(r=> r[0])); // addHashtags -> sequealize에서 associate함수를 보고 자동으로 만들어줌.   
            // console.log('해시태그 포함', includeHashtag);
        }
        const fullPost = await db.Post.findOne({
            where: {id: newPost.id},
            include:[{
                model: db.User,
            }]
        })
        return res.json(fullPost);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.post('/images',(req, res)=>{

});

module.exports=router;
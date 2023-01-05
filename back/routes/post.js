const express = require('express');
const db = require('../models');
const { isLoggedIn } = require('./middleware');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            cb(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 20*1024*1024},
})

router.get('/', async(req, res, next)=>{
    try {
        const posts = await db.Post.findAll({
            include:[{
                model: db.User,
                attributes: {
                    exclude: ['password']
                },
            },{
                model: db.Image,
            }],
            order:[['createdAt','DESC']] //DESC : 내림차순, ASC: 오름차순   
        });
        return res.json(posts);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.post('/',isLoggedIn, upload.none(), async(req, res, next)=>{
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

        if(req.body.image){
            if(Array.isArray(req.body.image)){
                const images = await Promise.all(req.body.image.map((image)=>{
                    return db.Image.create({content: image});
                }))
                await newPost.addImage(images);
            }else{
                const image = await db.Image.create({content: req.body.image});
                await newPost.addImage(image);
            }
        }
        const fullPost = await db.Post.findOne({
            where: {id: newPost.id},
            include:[{
                model: db.User,
                attributes: {
                    exclude: ['password']
                },
            },{
                model: db.Image,
            }]
        })
        return res.json(fullPost);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});


router.post('/images',upload.array('image'),(req, res)=>{
    console.log(req.files);
    return res.json(req.files.map(v=>v.filename));
});

router.get('/:id/comments', async (req, res, next)=>{
    try {
        const post = await db.Post.findOne({where: {id: req.params.id}});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.')
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
            },
            order:[['createdAt','ASC']],
            include:[{
                model: db.User,
                attributes: {
                    exclude: ['password']
                },
            }]
        });
        console.log('@@',comments);
        let sendData = {
            postId: req.params.id,
            comments: comments
        }

        return res.json(sendData);

    } catch (error) {
        console.error(error);
        return next(error);
    }
})
router.post('/:id/comment',isLoggedIn, async (req, res, next)=>{
    try {
        
        const post = await db.Post.findOne({where: {id: req.params.id}});
        if(!post){
            return res.status(404).send('포스트가 존재하지 않습니다.')
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });

        await post.addComment(newComment.id);
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },
            include:[{
                model: db.User,
                attributes: {
                    exclude: ['password']
                },
            }]
        });

        return res.json(comment);

    } catch (error) {
        console.error(error);
        return next(error);
    }
})

module.exports=router;
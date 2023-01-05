const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async(req, res, next)=>{
    try {
        const posts = await db.Post.findAll({
            include:[{
                model: db.Hashtag,
                where: { content: decodeURIComponent(req.params.tag)},
            },{
                model: db.User,
                attributes: {
                    exclude: ['password']
                },
            },{
                model: db.Image,
            }],
        });
        return res.json(posts);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports=router;
const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async(req, res, next)=>{
    try {
        let where = {};
        if(parseInt(req.query.lastId, 10)){
            where= {
                id: {
                    [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) //less then
                },
            }
        }
        const posts = await db.Post.findAll({
            where,
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
            },{
                model: db.User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id']
            },{
                model: db.Post,
                as: 'Retweet',
                include: [{
                    model: db.User,
                    attributes: {
                        exclude: ['password']
                    },
                },{
                    model: db.Image,
                }]
            }],
            order:[['createdAt','DESC']],
            limit: parseInt(req.query.limit, 10)
        });
        return res.json(posts);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports=router;

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post',{
        content: {
            type: DataTypes.TEXT, //매우 긴 글
            allowNull: false, //필수
        },
    },{
        charset: 'utf8mb4', //한글 + 이모티콘
        collate: 'utf8mb4_general_ci' //한글 저장
    })


    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // User id 저장
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Post, {as:'Retweet'}); 
        db.Post.belongsToMany(db.Hashtag,{through: 'PostHashtag'});
        db.Post.belongsToMany(db.User,{through: 'Like', as:'Likers'});
    };

    return Post;
}
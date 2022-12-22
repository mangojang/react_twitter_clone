module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment',{
        content: {
            type: DataTypes.TEXT, //매우 긴 글
            allowNull: false, //필수
        },
    },{
        charset: 'utf8mb4', //한글 + 이모티콘
        collate: 'utf8mb4_general_ci' //한글 저장
    })


    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User); // User id 저장
        db.Comment.belongsTo(db.Post); // Post id 저장
    };

    return Comment;
}
module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag',{
        content: {
            type: DataTypes.STRING(200),
            allowNull: false, //필수
        },
    },{
        charset: 'utf8', 
        collate: 'utf8_general_ci' //한글 저장
    })


    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post,{through: 'PostHashtag'}); // Post id 저장
    };

    return Hashtag;
}
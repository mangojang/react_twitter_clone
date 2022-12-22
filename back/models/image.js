module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image',{
        content: {
            type: DataTypes.STRING(200),
            allowNull: false, //필수
        },
    },{
        charset: 'utf8', 
        collate: 'utf8_general_ci' //한글 저장
    })


    Image.associate = (db) => {
        db.Image.belongsTo(db.Post); // Post id 저장
    };

    return Image;
}
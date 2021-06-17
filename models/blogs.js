// const Sequelize = require("sequelize");

module.exports = (sequelize, type) => {
    return sequelize.define('blog', {
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: type.STRING,
        content: type.STRING,
        image: type.STRING,
        //id_category: type.INTEGER, // ???
        categoryId:{
            type: type.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        creationDate: type.DATE
    })
}
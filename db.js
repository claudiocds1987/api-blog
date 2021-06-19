const Sequelize = require("sequelize");
require('dotenv').config();

// import model
const PostModel = require("./models/post");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "remotemysql.com",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});

// Model "Post" to interact with MySql db
const Post = PostModel(sequelize, Sequelize);

sequelize.sync({ force: false })
.then(() => {
    console.log('Tablas sincronizadas')
})

module.exports = {
  Post,
};

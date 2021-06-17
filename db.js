const Sequelize = require("sequelize");

// import model
const PostModel = require("./models/post");

const sequelize = new Sequelize("a63IZw2kCx", "a63IZw2kCx", "WlepKG1Mid", {
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

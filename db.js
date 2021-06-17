const Sequelize = require("sequelize");

// import models
const CategoryModel = require("./models/categories");
const BlogModel = require("./models/blogs"); // ?

const sequelize = new Sequelize("a63IZw2kCx", "a63IZw2kCx", "WlepKG1Mid", {
  host: "remotemysql.com",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});

// Model Category to interact with MySql db
//const Category = CategoryModel(sequelize, Sequelize);
const Blog = BlogModel(sequelize, Sequelize);


// Category.hasMany(Blog);
// Blog.belongsTo(Category);


sequelize.sync({ force: false })
.then(() => {
    console.log('Tablas sincronizadas')
})

module.exports = {
  //Category,
  Blog,
};

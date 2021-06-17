const router = require('express').Router();

const apiBlogRouter = require('./api/blogs'); // ?
const apiCategoryRouter = require('./api/categories');

router.use('/blog', apiBlogRouter); // ?
//router.use('/category', apiCategoryRouter);


module.exports = router;
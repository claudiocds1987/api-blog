const router = require('express').Router();

const apiBlogRouter = require('./api/post'); 

router.use('/posts', apiBlogRouter); 

module.exports = router;
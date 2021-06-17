const router = require('express').Router();

// model sequelized from db.js file
const { Blog } = require('../../db');

// get all blogs from db
router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({order: [['creationDate', 'DESC']]});
    res.json(blogs);
});

router.post('/', async (req, res) => {
    // res.send('Entra correctamente, funciona!');
    const blogs = await Blog.create(req.body);
    res.json(blogs);
});

module.exports = router;
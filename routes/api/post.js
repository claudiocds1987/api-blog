const router = require('express').Router();
// const multer = require("multer"); 

// model sequelized from db.js file
const { Post } = require('../../db');

// GET ALL
router.get('/', async (req, res) => {
    const posts = await Post.findAll({order: [['creationDate', 'DESC']]});
    res.json(posts);
});
// GET ONE
router.get('/:id', async (req, res) => {
    const posts = await Post.findByPk(req.params.id);
    res.json(posts);
});

// CREATE
router.post('/', async (req, res) => {
    // res.send('Entra correctamente, funciona!');
    const post = await Post.create(req.body);
    res.json(post);
});
// UPDATE
router.put('/:id', async (req, res) => {
    await Post.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({ succes: 'Post modificado exitosamente!' });
});

module.exports = router;
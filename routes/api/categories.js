const router = require('express').Router();

// model sequelized from db.js file
const { Category } = require('../../db');
//const catModel  = require('./../../models/categories');

// get all categories from db
router.get('/', async (req, res) => {
    //res.send('Entra correctamente, funciona!');
    const categories = await Category.findAll();
    res.json(categories);   
});

router.post('/', async (req, res) => {
    //res.send('Entra correctamente, funciona!');
    const category = await Category.create(req.body);
    res.json(category);   
});

module.exports = router;
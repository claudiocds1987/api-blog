const router = require("express").Router();
// const multer = require("multer");

// model sequelized from db.js file
const { Post } = require("../../db");

// GET ALL /api/posts
router.get("/", async (req, res) => {
  const posts = await Post.findAll({ order: [["creationDate", "DESC"]] });
  res.json(posts);
});

// GET ONE /api/posts/:id
router.get("/:id", async (req, res) => {
  const posts = await Post.findByPk(req.params.id);
  if (posts === null) {
    res.json({ error: "El id no existe!" });
  } else {
    res.json(posts);
  }
});

// CREATE /api/posts
router.post("/", async (req, res) => {
  // res.send('Entra correctamente, funciona!');
  const post = await Post.create(req.body);
  res.json(post);
});

// UPDATE WITH PATCH /api/posts/1
router.patch("/:id", async (req, res) => {
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: { id: req.params.id },
    }
  ).then((result) => {
    if(result[0] === 0){
        res.json({ error: "El id no existe!" });
    }else{
        res.json(result);
    }   
  });
});

// DELETE /api/posts/1
router.delete("/:id", async (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
      if(result === 0){
        res.json({ error: "El id no existe!" });
      }else{
        res.json(result);
      } 
  });
});

// UPDATE WITH PUT
// router.put('/:id', async (req, res) => {
//     await Post.update(req.body, {
//         where: { id: req.params.id }
//     });
//     res.json({ succes: 'Post modificado exitosamente!' });
// });

module.exports = router;

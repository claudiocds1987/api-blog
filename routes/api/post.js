const router = require("express").Router();
// ******************* UPLOAD DE IMAGE ******************* //
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    //carpeta donde va a guardar las imgs
    callBack(null, "public/images");
  },
  filename: (req, file, callBack) => {
    // uuid.v4() guarda la img con id aleatorio, para que no
    // se pisen imagenes en el caso que se suban con el mismo nombre
    callBack(
      null,
      uuid.v4() + path.extname(file.originalname).toLocaleLowerCase()
    );
  },
});

const upload = multer({
  storage,
  dest: "images/",

  limits: { fileSize: 2000000 }, // max permitido de image, 2 mega byte de peso
  fileFilter: (req, file, cb) => {
    console.log("FILE: " + JSON.stringify(file));
    const fileTypes = /jpeg|jpg|png|gif/; // expresion regular
    // mimetype checkea si el archivo es valido ej img/extension del archivo
    const mimetype = fileTypes.test(file.mimetype);
    // path.extname checkea si la img tiene la extension .jpeg o .jpg o .gif o .png
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: el archivo debe ser una imagen valida");
    }
  },
}).single("image");

router.route("/file").post(upload, (req, res, next) => {
  const file = req.body.image;
  console.log(file);
  if (!file) {
    console.log("No se subió ninguna imagen");
  }
  res.send(file);
  var ruta = req.file.path;
  console.log("ruta de imagen: " + ruta);
});
// ******************* FIN UPLOAD DE IMAGE ******************* //

// model sequelized from db.js file
const { Post } = require("../../db");

// GET ALL /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [["creationDate", "DESC"]] });
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

// GET ONE /api/posts/:id
router.get("/:id", async (req, res) => {
  try {
    const posts = await Post.findByPk(req.params.id);
    if (posts === null) {
      res.status(404).json({
        ok: false,
        msg: "No existe el id",
      });
    } else {
      res.json(posts);
    }
  } catch (error) {
    console.log(error);
  }
});

// CREATE /api/posts
router.post("/", upload, async (req, res) => {
  const postObj = {
    title: req.body.title,
    content: req.body.content,
    image: req.file.path,
    categoryId: req.body.categoryId,
    creationDate: req.body.creationDate,
  };

  try {
    const post = await Post.create(postObj);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

// UPDATE WITH PATCH /api/posts/1
router.patch("/:id", async (req, res) => {
  try {
    Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.id },
      }
    ).then((result) => {
      if (result[0] === 0) {
        res.status(404).json({
          ok: false,
          msg: "No existe el id",
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// DELETE /api/posts/1
router.delete("/:id", async (req, res) => {
  try {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      if (result === 0) {
        res.status(404).json({
          ok: false,
          msg: "No existe el id",
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

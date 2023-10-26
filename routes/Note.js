const router = require("express").Router();

const notesController = require("../controllers/notesController")

//rotas do notesController e seus métodos
router
.route("/Note")
.post((req,res) => notesController.create(req,res));

router
.route("/Note")
.get((req,res) => notesController.find(req,res));

router
.route("/:id")
.delete((req,res) => notesController.delete(req,res));

router
.route("/:id")
.put((req,res) => notesController.put(req,res));


//exportação do router
module.exports = router;
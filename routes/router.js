const router = require("express").Router();

//Services router
const noteRouter = require("./rotNote");
const cadastroRouter = require("./rotCadas");

router.use("/", noteRouter);
router.use("/", cadastroRouter);
module.exports = router;
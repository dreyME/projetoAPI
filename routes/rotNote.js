const router = require("express").Router();
const noteVal = require("../middlewares/MidNote")
const MiddlewareAuthenticate = require("../middlewares/authenticate")

const notesController = require("../controllers/notesController")

//rotas do notesController e seus métodos
router
    .route("/Note")
    .post(MiddlewareAuthenticate.authenticate, noteVal.notaValidation, noteVal.ValidateNota, noteVal.validateNotDupicated, notesController.create)
    .get(MiddlewareAuthenticate.authenticate, notesController.find);

router
    .route('/Note/:id')
    .get(MiddlewareAuthenticate.authenticate, noteVal.validateIsId, noteVal.ValidateNota, noteVal.isExistId, notesController.findOneById)
    .delete(MiddlewareAuthenticate.authenticate, noteVal.validateIsId, noteVal.ValidateNota, noteVal.isExistId, notesController.delete)
    .put(MiddlewareAuthenticate.authenticate, noteVal.notaValidationId, noteVal.ValidateNota, noteVal.isExistId, notesController.put);


//exportação do router
module.exports = router;
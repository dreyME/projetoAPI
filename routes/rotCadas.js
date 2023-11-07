const router = require("express").Router();
const CadasVal = require("../middlewares/MidCadas");
const MiddlewareAuthenticate = require('../middlewares/authenticate')

const cadastroController = require("../controllers/CadastroController")

//rota de autenticação
router
    .route('/authenticate')
    .post(CadasVal.loginValidate, CadasVal.ValidateCad, cadastroController.login)


//rota do administrador e seus métodos
router
    .route("/user/admin")
    .post(MiddlewareAuthenticate.authenticate, CadasVal.adminValidate, CadasVal.ValidateCad, CadasVal.validateNotDuplicated, cadastroController.createAdmin)
    .get(MiddlewareAuthenticate.authenticate, cadastroController.find);
    


//rotas do usuário e seus métodos
router
    .route("/user/public")
    .post(CadasVal.loginValidate, CadasVal.ValidateCad, CadasVal.validateNotDuplicated, cadastroController.create)
    .get(MiddlewareAuthenticate.authenticate, cadastroController.find);

//rotas através do id
router
    .route("/user/:id")
    .get(MiddlewareAuthenticate.authenticate, CadasVal.loginValidateID, CadasVal.ValidateCad, CadasVal.idExiste ,cadastroController.findOneById)
    .delete(MiddlewareAuthenticate.authenticate, CadasVal.valDelete, CadasVal.loginValidateID, CadasVal.ValidateCad , CadasVal.idExiste , cadastroController.delete)
    .put(MiddlewareAuthenticate.authenticate, CadasVal.loginValidate, CadasVal.loginValidateID, CadasVal.ValidateCad, CadasVal.idExiste , CadasVal.validateNotDuplicatedIsNotId, cadastroController.put)


//exportação do router
module.exports = router;

/*
_id: 11
higordiegoti@gmail.com
kaua@gmail.com

_id: 12
andrey@gmail.com
*/
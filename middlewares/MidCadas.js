const {body, param, validationResult} = require('express-validator')
const Cadastro = require("../models/Cadastro")
const jwt = require('jsonwebtoken');



exports.valDelete = (req, res, next) => {
  const { id } = req.params

  if(req.params.id === req.user.id) return next();

  if(!req.user.owner === true && !req.user.admin === true && req.params.id !== req.user.id){
    return res.status(401).json( { msg: 'Você só pode deletar usuários se você for um Proprietário, um Admin, ou se a conta for sua!!'} )

    //req.params.id !== req.user.id

  } else return next()
  
  
}

exports.loginValidate = [
    body('email').isEmail().notEmpty(),
    body('senha').isStrongPassword()
]

exports.adminValidate = [
  body('email').isEmail().notEmpty(),
  body('senha').isStrongPassword(),
  body('admin').isBoolean().withMessage('Apenas aceita se o valor for booleano')
]

exports.ownerValidate = [
  body('email').isEmail().notEmpty(),
  body('senha').isStrongPassword(),
  body('admin').isBoolean().optional().withMessage('Apenas aceita se o valor for booleano'),
  body('owner').isBoolean().optional().withMessage('Owner ta dando BO')
]

exports.loginValidateID = [
  param('id').isMongoId(),
]


exports.validateNotDuplicatedIsNotId = async (req, res, next) => {

  try {
    const id = req.params.id
     const body = req.body
     const resultado = await Cadastro.findOne({ _id: { $ne: id }, email: body.email })
     if (resultado) return res.status(400).json({ error: [{ title: 'ID', message: 'ERROR: Este email já existe!' }]})
     return next();

  } catch (err) {
    res.status(500).json({ error: [{title: err.message, message: err.message}]})
  }
}


exports.validateNotDuplicated = async (req, res, next) => {

  try {
     const body = req.body
     const resultado = await Cadastro.findOne({ email: body.email })
     if (resultado) return res.status(400).json({ error: [{ title: 'ID', message: 'ERROR: Conta já existente no banco de dados' }]})
     return next();

  } catch (err) {
    res.status(500).json({ error: [{title: err.message, message: err.message}]})
  }
}

exports.idExiste = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Cadastro.findById(id)
        if (!result) return res.status(400).json({error: [{ title: 'Id', message: 'ERROR: Id não existente' }]})
        return next()
    } catch(err) {
      res.status(500).json({ error: [{ title: err.message, message: err.message }]})
    }
}



exports.ValidateCad = (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) return next()
  return res.status(400).json(result)
}

exports.authToken = async (req, res, next) => {

     const verify = await jwt.verify(req.params.id)
     return verify;
   
}





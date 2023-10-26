const { body, param,  validationResult} = require('express-validator');
const Nota = require('../models/NewNote');
const { title } = require('process');

exports.notaValidation = [
    body('title').notEmpty(),
]

exports.validateIsId = [
    param('id').isMongoId()
]

exports.notaValidationId = [
    param('id').isMongoId(),
    body('title').notEmpty(),
]

exports.ValidateNota = (req, res, next) => {
    const resultado = validationResult(req)
    if(resultado.isEmpty()) return next()
    return res.status(400).json(resultado);
};


exports.validateNotDupicated = async (req, res, next) => {
    try {
        const id = req.params.id
        const body = req.body
        const user = req.user.id
        
        const resultado = await Nota.findOne({ _id: {$ne: id}, user_id: user, title: body.title }); 
        if (resultado) return res.status(400).json({errors: [{title: 'Título duplicado', message: 'ERROR: Selecione outro titulo'}]})
        return next();

        // validar se os campos unico estão no banco de dados
        // caso sim, retornar para o usuário que já contêm este cadastro
        // caso contrário, ir para o próximo.
        
    } catch (err) {
        return res.status(500).json({ errors: [{ title: err.message, error: err.message } ]})
    }
}

exports.isExistId = async (req, res, next) =>  {
    try {
        const id = req.params.id
        const result = await Nota.findById(id)
        if (!result) return res.status(400).json({ errors: [{ title: 'Id',  message: 'Id não existente!' }]})
        return next()
    } catch (err) {
        return res.status(500).json({ errors: [{ title: err.message, error: err.message } ]})
    }
}






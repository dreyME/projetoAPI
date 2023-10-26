const message = { message: 'Por favor faça o login!'  }
const jsonwebtoken = require('jsonwebtoken')


const verifyToken = (jwtToken) => {
    try {
        jsonwebtoken.verify(jwtToken, 'abc')
        return false
    }catch (e) {
        return true
    }
}

exports.authenticate = (req, res, next) => {
    try {

        const token = req.headers.authorization
        if (!token) return res.status(401).json(message)
        const [_, jwtToken] = token.split(' ') 
    
        if (!jwtToken) return res.status(401).json(message)

        if (verifyToken(jwtToken)) return res.status(401).json(message)

        req.user = jsonwebtoken.decode(jwtToken)
        
        return next()
    } catch (err) {
        return res.status(401).json(message)
    }
}
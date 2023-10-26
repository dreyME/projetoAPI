const jwt = require('jsonwebtoken')
const SECRET = 'abc'

// https://nodejs.org/api/buffer.html

const user = {
    id: '1231231321'
}

// hash.hash.hash
//O SECRET É COMO SE FOSSE UMA SENHA PARA A GERAÇÃO DOS SEUS TOKENS
const a = jwt.sign(user, SECRET, {
    expiresIn: 3
})

const verify = jwt.verify(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    'abc'   
)

// login e senha
// routa
// controller
// identificar se login e senha é valido
// gerar um jwt com id do usuario no seu payload
// retornar o usuario, e um token dentro do json para o frontend

console.log('a', a)
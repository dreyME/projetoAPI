(async () => {
    require('./db/conn')
    const bcrypt = require('bcryptjs')
    const model = require('./models/Cadastro')

    console.log(' [x] - Init seeed')
    const email = 'owner@gmail.com'
    const senha = '987654321.Jo'

    const isOwner = await model.findOne({ email })

    if (!isOwner) {
        await model.create({
            email,
            senha: await bcrypt.hash(senha, 10),
            admin: true,
            owner: true
        })
    }

    console.log(' [x] - finish seed')
    process.exit(1)

})()

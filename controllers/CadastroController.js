const infoCadastro = require("../models/Cadastro");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const cadastroController = {
    
        login: async (req, res) => {

            
            try{
                const { email, senha } = req.body
                const user = await infoCadastro.findOne({ email })
               
                const passwordIsValid = await bcrypt.compare(senha, user.senha)
               
            if (!user) return res.status(400).json({ message: 'Usuário ou senha estão incorretos!' })

            if(!passwordIsValid){
                return res.status(400).json({msg: 'Senha Inválida'})
            }

            const token = jwt.sign({ id: user.id, admin: user.admin , owner: user.owner}, 'abc', { expiresIn: 3000 })
            return res.status(200).json({ token, user })


            } catch (error) {
                res.status(500).json({ msg: error.message })
                console.log(error)
            }
        },

        createOwner: async(req, res) => {

            try {
                if (!req.user.owner === true) {
                //req.body.owner = false
                const cadastro = new infoCadastro({
                    id: req.params.id,
                    email: req.body.email,
                    admin: req.body.admin,
                    owner: false,
                    senha: await bcrypt.hash(req.body.senha, 10)
                })
                
                const cadastroOwnerPost = await infoCadastro.create(cadastro)
                cadastroOwnerPost.save();
    
                return res.status(201).json({ userAdmin: cadastro })
            } else {
                const cadastro = new infoCadastro({
                    id: req.params.id,
                    email: req.body.email,
                    admin: req.body.admin,
                    owner: req.body.owner,
                    senha: await bcrypt.hash(req.body.senha, 10)
                })

                const cadastroOwnerPost = await infoCadastro.create(cadastro)
                cadastroOwnerPost.save();
    
                return res.status(201).json({ userAdmin: cadastro })
            }
    
               
    
            } catch (error) {
                res.status(500).json({ error: error.message});
                console.log(error)
            }
                
    
    
    
            },

        createAdmin: async(req, res) => {

        try {

            if (!req.user.admin) return req.body.admin = false

            const cadastro = new infoCadastro({
                id: req.params.id,
                email: req.body.email,
                admin: req.body.admin,
                owner: false,
                senha: await bcrypt.hash(req.body.senha, 10)
            })

            const cadastroAdminPost = await infoCadastro.create(cadastro)
            cadastroAdminPost.save();

            return res.status(201).json({ userAdmin: cadastro })

        } catch (error) {
            res.status(500).json({ error: error.message});
            console.log(error)
        }
            



        },

        create: async(req, res) => {
            try {
               
                const cadastro = new infoCadastro({
                    id: req.params.id,
                    email: req.body.email,
                    admin: false,
                    owner: false,
                    senha: await bcrypt.hash(req.body.senha, 10)
                    
                })

                const cadastroPost = await infoCadastro.create(cadastro);
                cadastroPost.save();

                return res.status(201).json({user: cadastro });
                
            } catch (error) {
                res.status(500).json({ error: error.message })
                console.log(error);
            }
        },
    
        find: async(req, res) => {
            try {
                const { admin, owner } = req.user
                if(admin === true || owner === true){
                    const cadastroGet = await infoCadastro.find()
                    return res.send(cadastroGet)
                } else{
               const cadastroGet = await infoCadastro.find({_id: req.user.id}, {senha : 0})
               return res.send(cadastroGet)
                }

            } catch (error) {
                res.status(500).json({ error: error.message});
                console.log(error)
            }
        },

        findOneById: async(req, res) => {
            try {
               const cadastroGet = await infoCadastro.findOne({ _id: req.params.id})
               res.send(cadastroGet)
    
            } catch (error) {
                res.status(500).json({ error: error.message});
                console.log(error)
            }
        },
    
    
        delete: async(req, res) => {
            try {
                //if(cadastroDel.email === "AdminDefault@gmail.com") return res.status(401).json({ msg: "Você não pode apagar a conta Padrão do Admin!!"  })
                const user = await infoCadastro.findOne({_id: req.params.id})

                if(user.owner === true) return res.status(401).json({ msg: "Você não pode apagar uma conta Owner(Proprietária) sem ser um proprietário!!"})

               const cadastroDel = await infoCadastro.findByIdAndRemove(req.params.id)
               res.send(cadastroDel);
    
            } catch (error) {
                res.status(500).json({ error: error.message});
                console.log(error)
            }
        },

    
        put: async (req, res) => {
            try {
                //if(!req.user.admin === true) req.params.id = req.user.id 

            if(!req.user.admin === true){

               req.params.id = req.user.id 

               const cadastroPut = await infoCadastro.findByIdAndUpdate(req.params.id, {
                email: req.body.email,
                senha: await bcrypt.hash(req.body.senha, 10),
               })
               res.send(cadastroPut);

            } else {
                const user = await infoCadastro.findOne({_id: req.params.id})

                if(user.owner === true) return res.status(401).json({ msg: "Você não pode atualizar a conta Padrão do Admin!!"})
                
                const cadastroPut = await infoCadastro.findByIdAndUpdate(req.params.id, {
                    email: req.body.email,
                    senha: await bcrypt.hash(req.body.senha, 10),
                    admin: req.body.admin
                   })
                   res.send(cadastroPut);
            }
            

            //CRIAR UM IF DEPOIS DESSE ELSE AÍ DE CIMA
            
            

            } catch (error) {
                res.status(500).json({ error: error.message })
                console.log(error);
            }
        }
    }
    
module.exports = cadastroController;


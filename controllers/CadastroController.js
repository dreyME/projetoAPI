const infoCadastro = require("../models/Cadastro");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const cadastroController = {
    
        login: async (req, res) => {

            
            try{
                let { senha } = req.body
                let { email } = req.body
                
                
                if (email && typeof email === 'string') {
                    email = email.toLowerCase();
                  }

                
                const user = await infoCadastro.findOne({ email })

                if (!user) return res.status(400).json({ message: 'Usuário ou senha estão incorretos!' })

                const passwordIsValid = await bcrypt.compare(senha, user.senha)
               
           
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

                if(!req.user.owner === true) return res.status(401).json({ msg:"Você não tem permissão para realizar esta ação" })

                if(req.body.cnfsenha != req.body.senha) return res.status(400).json({ msg: 'As senhas não coincidem!!' })
                    
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

            } catch (error) {
                res.status(500).json({ error: error.message});
                console.log(error)
            }
                
    
    
    
            },

        createAdmin: async(req, res) => {

        try {

            if (req.user.owner === true) {

                if(req.body.cnfsenha != req.body.senha){
                    return res.status(400).json({ msg: 'As senhas não coincidem!! ' })
                }
    
                const cadastro = new infoCadastro({
                    id: req.params.id,
                    email: req.body.email,
                    admin: req.body.admin,
                    owner: req.body.owner,
                    senha: await bcrypt.hash(req.body.senha, 10)
                })
    
                const cadastroAdminPost = await infoCadastro.create(cadastro)
                cadastroAdminPost.save();
    
                return res.status(201).json({ userAdmin: cadastro })

            } else {

            if(!req.user.admin === true) return res.status(401).json({ msg: "Você não tem permissão para realizar esta ação" })


            if(req.body.cnfsenha != req.body.senha){
                return res.status(400).json({ msg: 'As senhas não coincidem!! ' })
            }

            const cadastro = new infoCadastro({
                id: req.params.id,
                email: req.body.email,
                senha: await bcrypt.hash(req.body.senha, 10)
            })

            const cadastroAdminPost = await infoCadastro.create(cadastro)
            cadastroAdminPost.save();

            return res.status(201).json({ userAdmin: cadastro })
            }

        } catch (error) {
            res.status(500).json({ error: error.message});
            console.log(error)
        }
            



        },

        create: async(req, res) => {
            try {
               
                if(req.body.cnfsenha != req.body.senha){
                    return res.status(400).json({ msg: 'As senhas não coincidem!! ' })
                }

                const cadastro = new infoCadastro({
                    id: req.params.id,
                    email: req.body.email,
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
                } else {
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
                
                const user = await infoCadastro.findOne({_id: req.params.id})
                const userID = await infoCadastro.findOne({ _id: req.user.id })

                if (userID.owner === true){

                     const cadastroDel = await infoCadastro.findByIdAndRemove(req.params.id)
                     return res.send(cadastroDel);

                }

                if(userID.id === user.id){
                    const cadastroDel = await infoCadastro.findByIdAndRemove(req.user.id)
                    return res.send(cadastroDel);
                }

                if(userID.admin === true && user.admin === true || user.owner === true) return res.json({ msg: "Apenas o owner pode apagar uma conta Owner ou Admin!!"})

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

            if(!req.user.admin === true && !req.user.owner === true){
            
               req.params.id = req.user.id 

               
               
               let { email } = req.body

               email = email.toLowerCase();


               const cadastroPut = await infoCadastro.findByIdAndUpdate(req.params.id, {
                email: email,
                senha: await bcrypt.hash(req.body.senha, 10),
               })
               res.send(cadastroPut);

            } else {
                const user = await infoCadastro.findOne({ _id: req.params.id })
                const userID = await infoCadastro.findOne({ _id: req.user.id })


                if (userID.owner === true){

                    let { email } = req.body
                    email = email.toLowerCase()
    
                    const cadastroPut = await infoCadastro.findByIdAndUpdate(req.params.id, {
                        email: email,
                        senha: await bcrypt.hash(req.body.senha, 10),
                        admin: req.body.admin,
                        owner: req.body.owner
                       })
                      return res.send(cadastroPut);

                }
                
                
                if(user.owner === true) return res.status(401).json({ msg: "Você não pode atualizar uma conta Owner(Proprietária) sem ser um proprietário!!"})
                
                else{

                    if(userID.id === user.id){
                        let { email } = req.body
                        email = email.toLowerCase()

                    const cadastroPut = await infoCadastro.findByIdAndUpdate(req.params.id, {
                        email: email,
                        senha: await bcrypt.hash(req.body.senha, 10),
                   })
                   return res.send(cadastroPut);

                    }

                    if(user.admin === true) return res.status(401).json({ msg: "Você não pode atualizar uma conta Admin sem ser um proprietário!!"})

                    let { email } = req.body
                    email = email.toLowerCase()

                const cadastroPut = await infoCadastro.findByIdAndUpdate(req.params.id, {
                    email: email,
                    senha: await bcrypt.hash(req.body.senha, 10),
                   })
                   return res.send(cadastroPut);
                }
            }
        
            

            //CRIAR UM IF DEPOIS DESSE ELSE AÍ DE CIMA
            
            

            } catch (error) {
                res.status(500).json({ error: error.message })
                console.log(error);
            }
        }
    }
    
module.exports = cadastroController;


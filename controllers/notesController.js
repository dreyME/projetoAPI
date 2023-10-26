const infoNote = require("../models/NewNote");


const notesController = {

    create: async(req, res) => {
        try {
            const Note = new infoNote({
                title: req.body.title,
                description: req.body.description, 
                image: req.body.image,
                option: req.body.option,
                user_id: req.user.id,
            })

            const notePost = await infoNote.create(Note);
            notePost.save();
            res.json({msg: `Nota criada com sucesso!`})

        } catch (error) {
            console.log(error);
        }
    },

    find: async(req, res) => {
        try {
            let query = {user_id: req.user.id}
            //esse eu alterei também
            if (req.query?.option) query = {...query, option: req.query.option }
            console.log('req.query', req.query)
           const noteGet = await infoNote.find(query)
           res.send(noteGet)

        } catch (error) {
            console.log(error);
        }
    },


    findOneById: async(req, res) => {
        try {
            //o "user_id" está pegando o id do usuário para poder fazer determinada alteração
           const noteGetID = await infoNote.findOne({ _id: req.params.id, user_id: req.user.id })
           res.send(noteGetID)

        } catch (error) {
            console.log(error);
        }
    },


    delete: async(req, res) => {
        try {

          
            //não sei se isso está certo, falar para Higor depois
           

           const noteDel = await infoNote.findByIdAndRemove({_id: req.params.id, user_id: req.user.id })
           res.json({ msg: 'Nota deletada com sucesso!' });

        } catch (error) {
            console.log(error);
        }
    },

    put: async (req, res) => {
        try {
           const notePut = await infoNote.updateOne({_id: req.params.id, user_id: req.user.id}, {
                title: req.body.title,
                description: req.body.description, 
                image: req.body.image,
                user_id: req.user.id
           })
           res.status(200).json({ msg: 'Nota atualizada com sucesso!'});

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = notesController;

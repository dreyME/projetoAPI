const mongoose = require("mongoose");
const { Schema } = mongoose

const notaSchema = new Schema({
    title: { 
        type: String,
        required: true,

        
    },
    option: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    user_id: { 
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Cadastro'
    },
},
{
    timestamps: true,
}
)


module.exports = mongoose.model('Nota', notaSchema)






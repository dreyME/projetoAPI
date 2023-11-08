const mongoose = require("mongoose");
const { Schema } = mongoose
const bcrypt = require("bcryptjs")

//schema
const CadastroSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
    },
    owner:{   
        type: Boolean
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Cadastro', CadastroSchema)
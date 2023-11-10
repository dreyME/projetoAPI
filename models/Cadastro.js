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
    cnfsenha:{
        type: String,
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

CadastroSchema.pre('save', function(next) {

    if (this.email && typeof this.email === 'string') {
        this.email = this.email.toLowerCase();
    }

    return next()
  
})

module.exports = mongoose.model('Cadastro', CadastroSchema)
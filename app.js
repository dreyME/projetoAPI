const express = require ("express");
const cors = require('cors')
const app = express();
const port = 3333
//const { body, param, validationResult } = require("express-validator")
//const {emailVal , senhaVal} = require("../middlewares/MidCadas");

app.use(cors());

app.use(express.json());

//DB Connection
require("./db/conn")


//Routes
const routes = require("./routes/router");
app.use("/api", routes);

app.get('/', (req,res) => {
    res.json({msg:'Server is Running on port 3330'})
})

app.get('/api', (req,res) => {
    res.json({msg:'API is Running on port 3330'})
})

app.listen(process.env.PORT || 3330, () => {
    console.log("Servidor Online!");
});

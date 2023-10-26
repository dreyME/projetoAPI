const express = require ("express");
const app = express();


app.use(express.json());

//DB Connection
const connDB = require("./db/conn")

connDB();

//Routes
const routes = require("./routes/router");
app.use("/api", routes);

app.listen(3333, () => {
    console.log("Servidor Online!");
});

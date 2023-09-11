const connectToMongo=require("./db");
const { query, validationResult } = require('express-validator');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

//middlman for body to pass
app.use(express.json());

//Availaible routes
app.use("/api/auth",require('./routes/auth'))
app.use("/api/note",require('./routes/note'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
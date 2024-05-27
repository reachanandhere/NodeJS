const express = require("express");
const app = express();
require("./src/DB/connection");

const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const jwt = require('jsonwebtoken')

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

 app.listen(port, () => {
  console.log("Server is listening!");
});

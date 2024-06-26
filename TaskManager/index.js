const express = require("express");
const app = express();
require("./src/DB/connection");

const userRouter = require('./src/routes/user')
const taskRouter = require('./src/routes/task')

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

 app.listen(port, () => {
  console.log("Server is listening!");
});

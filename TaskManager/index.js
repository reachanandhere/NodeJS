const express = require("express");
const app = express();
require("./src/DB/connection");

const User = require("./models/user");
const Task = require("./models/task");
const port = process.env.PORT || 3002;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(200).send("user Saved");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(200).send(task);
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    if (users) res.status(200).send(users);
  } catch (err) {
    res.status(400).send("Couldn't find users")
  }
});

app.get("/tasks", async (req, res) => {
    try {
      const tasks = await Task.find();
      if (tasks) res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send("Couldn't find tasks")
    }
  });


app.patch('/users/:id',async(req, res)=>{
    const updates  = Object.keys(req.body)
    const allowedIUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every(update=>allowedIUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Operation'})
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!user){
            return res.status(404).send()
        }
        res.status(201).send(user)
    }catch(err){
        return res.status(404).send(err)
    }
})  

app.listen(port, () => {
  console.log("Server is listening!");
});

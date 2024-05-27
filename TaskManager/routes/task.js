const Task = require("../models/task");
const express = require('express')
const taskRouter = new express.Router()


taskRouter.get("/tasks", async (req, res) => {
    try {
      const tasks = await Task.find();
      if (tasks) res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send("Couldn't find tasks")
    }
  });


  taskRouter.post("/tasks", (req, res) => {
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

  module.exports = taskRouter
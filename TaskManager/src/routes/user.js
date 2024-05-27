const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const auth = require('../middleware/auth')

const userRouter = new express.Router();

userRouter.post("/users", async (req, res) => {
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const userObj = {
    ...req.body,
    password: hashedPassword,
  };

  const user = new User(userObj);
  user
    .save()
    .then(async () => {
      const token = await user.generateAuthToken();

      res.status(200).send({
        user,
        token,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

userRouter.get("/users/me", auth, async (req, res) => {
  res.status(200).send(req.user)
});

userRouter.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedIUpdates = ["name", "email", "age", "password"];
  const isValidOperation = updates.every((update) =>
    allowedIUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operation" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send(user);
  } catch (err) {
    return res.status(404).send(err);
  }
});

userRouter.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.status(200).send({
      user,
      token,
    });
  } catch (err) {
    res.status(400).send();
  }
});

userRouter.post('/users/logout', auth, async (req, res)=>{
  try {
      req.user.tokens = req.user.tokens.filter(token=>{
        return token.token !== req.token
      })

      await req.user.save()
      res.status(200).send()
  }catch(err){
      res.status(500).send()
  }
})

module.exports = userRouter;

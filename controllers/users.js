const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, likes: 1 });
  response.json(users.map((user) => user.toJSON()));
});

usersRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id);
  if (user) {
    response.json(user.toJSON());
  } else {
    response.status(404).end;
  }
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  // password must be at least 3 characters long
  if (body.password.length < 3) {
    response.json({ error: "password must be at least 3 characters long" });
  }
  const passwordHash = await bcrypt.hash(
    body.password,
    Number(process.env.NUM_ROUNDS)
  );
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  const savedUser = await user.save();
  response.json(savedUser.toJSON()); // i added toJSON()
});

module.exports = usersRouter;

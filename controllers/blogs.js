const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFromRequest = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .sort({ likes: -1 })
    .populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end;
  }
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes, userId } = request.body;
  // const token = getTokenFromRequest(request);
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    // user: user.id,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog.toJSON());
});

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  // const { title, author, url, likes } = req.body;

  // const blogToUpdate = { likes: req.body.likes + 1 }; // title, author, url,
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  res.json(updatedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  // a blog can be deleted only by the user who added the blog

  // deleting a blog is possible only if the token sent with the
  // request is the same as that of the blog's creator.
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  // If deleting a blog is attempted without a token or by a wrong user,
  // the operation should return a suitable status code.
  const blog = await Blog.findById(id);
  if (blog.user.toString() === decodedToken.id.toString()) {
    console.log(blog.user.toString());
    console.log(decodedToken.id.toString());
    await Blog.findByIdAndRemove(id);
    res.status(204).end();
  }
});

module.exports = blogsRouter;

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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
  const { title, author, url, likes } = request.body;
  const blog = new Blog({ title, author, url, likes });
  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

module.exports = blogsRouter;

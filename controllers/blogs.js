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
  const blog = new Blog({ title, author, url, likes: likes || 0 });
  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());
});

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  // const { title, author, url, likes } = req.body;

  const blogToUpdate = { likes: req.body.likes }; // title, author, url,
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $set: blogToUpdate },
    {
      new: true,
    }
  );
  res.json(updatedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

module.exports = blogsRouter;

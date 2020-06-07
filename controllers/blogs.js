const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));

  // Blog.find({})
  //   .then((blogs) => {
  //     response.json(blogs.map((blog) => blog.toJSON()));
  //   })
  //   .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({ title, author, url, likes });
  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());

  // console.log(blog);
  // blog
  //   .save()
  //   .then((savedBlog) => {
  //     response.json(savedBlog.toJSON());
  //   })
  //   .catch((error) => next(error));
});

module.exports = blogsRouter;

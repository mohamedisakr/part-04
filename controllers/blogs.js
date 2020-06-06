const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs.map((blog) => blog.toJSON()));
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({ title, author, url, likes });
  // console.log(blog);
  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;

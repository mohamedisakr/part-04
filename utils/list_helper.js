const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const result = blogs
    .map(({ likes }) => likes)
    .reduce((initValue, accum) => (accum += initValue));
  return result;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const result = blogs.reduce((a, b) =>
    a.likes > b.likes
      ? { title: a.title, author: a.author, likes: a.likes }
      : { title: b.title, author: b.author, likes: b.likes }
  );
  return result;
};

//  returns the author who has the largest amount of blogs.
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const result = blogs.reduce((a, b) =>
    a.blogs > b.blogs
      ? { author: a.author, blogs: a.blogs }
      : { author: b.author, blogs: b.blogs }
  );
  return result;
};

// returns the author, whose blog posts have the largest amount of likes.
// The return value also contains the total number of likes that the author has received
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const result = blogs.reduce((a, b) =>
    a.likes > b.likes
      ? { author: a.author, likes: a.likes }
      : { author: b.author, likes: b.likes }
  );
  return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };

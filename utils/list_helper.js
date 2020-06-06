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
    return 0;
  }

  const result = blogs.reduce((a, b) =>
    a.likes > b.likes
      ? {
          title: a.title,
          author: a.author,
          likes: a.likes,
        }
      : {
          title: b.title,
          author: b.author,
          likes: b.likes,
        }
  );
  return result;
};

//  returns the author who has the largest amount of blogs.
const mostBlogs = (blogs) => {
  const result = blogs.reduce((a, b) => {
    a.blogs > b.logs
      ? { author: a.author, blogs: a.blogs }
      : { author: b.author, blogs: b.blogs };
  });
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };

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

module.exports = { dummy, totalLikes, favoriteBlog };
//   blogs.reduce((prev, current) => {
//     // console.log(prev, current);
//     result = Math.max(prev.likes, current.likes);
//   });

//   const most = {};
//   blogs.forEach((blog, index, list) => {

//   });

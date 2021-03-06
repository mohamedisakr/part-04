// jest.useFakeTimers();

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  findByCriteria,
} = require("./test_helper");

const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogList = initialBlogs.map((blog) => new Blog(blog));
  const promiseList = blogList.map((blog) => blog.save());
  await Promise.all(promiseList);
});

//#region dummy
/*
describe("dummy", () => {
  test("return 1", () => {
    const blogs = [];
    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});
*/
//#endregion

//#region Total Likes
/* 
describe("Total Likes", () => {
  test("total like = 20", () => {
    const blogs = [
      {
        _id: "5edb4b378800b916d47f3456",
        title: "node.js tips and tricks",
        author: "mohamed hassan",
        url: "http://localhost:3003/api/blogs",
        likes: 10,
      },
      {
        _id: "5edb725a8581b00a084abb7b",
        title: "intro to node.js",
        author: "mohamed hassan",
        url: "http://localhost:3003/api/blogs/intro-nodejs",
        likes: 10,
      },
    ];

    const result = totalLikes(blogs);
    expect(result).toBe(20);
  });

  test("empty array >> 0", () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});
*/
//#endregion

//#region
/*
describe("Favorite Blog ", () => {
  test("which blog has most likes", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url:
          "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url:
          "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const received = favoriteBlog(blogs);
    expect(received).toEqual(expected);
  });
});

describe("Most Blogs", () => {
  test("the author who has the largest amount of blogs", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        blogs: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        blogs: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        blogs: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url:
          "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        blogs: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url:
          "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        blogs: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        blogs: 2,
        __v: 0,
      },
    ];

    const expected = { author: "Edsger W. Dijkstra", blogs: 12 };
    const received = mostBlogs(blogs);
    expect(received).toEqual(expected);
  });
});

describe("Most Likes", () => {
  test("the author, whose blog posts have the largest amount of likes", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url:
          "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url:
          "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];

    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const received = mostLikes(blogs);
    expect(received).toEqual(expected);
  });
});
*/
//#endregion

describe("4.8: Blog list tests, step1", () => {
  // Optimizing the beforeEach function

  test("HTTP GET request to the /api/blogs url.", async () => {
    const response = await blogsInDb();
    expect(response).toHaveLength(initialBlogs.length);
  });

  test("HTTP POST request to the /api/blogs url.", async () => {
    const newBlog = {
      title: "JavaScript the complete guide",
      author: "Mohamed Sakr",
      url: "fullstackopen.com/en/part4/testing_the_backend",
      likes: 20,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
    // const response = await blogsInDb();
    // expect(response).toHaveLength(initialBlogs.length);
  });

  test("verify that the unique identifier property of the blog posts is named id", async () => {
    const response = await blogsInDb();
    const firstBlog = response[0];
    expect(firstBlog.id).toBeDefined();
  });

  test("4.10 verify that making an HTTP POST request to the /api/blogs url successfully creates a new blog post", async () => {
    const newBlog = {
      title: "Digging Into Node.js",
      author: "mohamed sakr",
      url: "http://localhost:3003/api/blogs/intro-nodejs",
      likes: 10,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtend = await blogsInDb();
    expect(blogsAtend).toHaveLength(initialBlogs.length + 1);

    const titles = blogsAtend.map((b) => b.title);
    expect(titles).toContain(newBlog.title);
  });

  test("4.11* that if the likes property is missing from the request, it will default to the value 0", async () => {
    let inserted = {};
    const newBlog = {
      title: "Digging Into Node.js",
      author: "mohamed sakr",
      url: "http://localhost:3003/api/blogs/intro-nodejs",
      likes: 10,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .end(() => {
        inserted = findByCriteria(newBlog.title);
      });

    expect(inserted.likes).toBe(0);
  });

  test("4.12*: Blog list tests step 5,  verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.", async () => {
    const newBlog = {
      author: "mohamed sakr",
      likes: 10,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtend = await blogsInDb();
    expect(blogsAtend).toHaveLength(initialBlogs.length);
  });

  describe("deletion of a note", () => {
    test("4.13 succeeds with status code 204 if id is valid", async () => {
      const blogsAtStart = await blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await blogsInDb();

      expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

      const titles = blogsAtEnd.map((r) => r.title);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });
});
afterAll(() => mongoose.connection.close());

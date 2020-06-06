const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () =>
  logger.info(`Server running on port ${config.PORT}`)
);

/*
const express = require("express");
const app = express();
const cors = require("cors");


const mongoUrl = "mongodb://localhost:27017/bloglist";

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());



const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

require("./db/connection");
const express = require("express");
const movieRouter = require("./movie/movieRoutes");
const userRouter = require("./user/userRoutes");
const cors = require("cors");
const app = express();
const port = 5000;

// methods above routers so that the routers have access to them

app.use(express.json());
app.use(cors());
app.use(movieRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

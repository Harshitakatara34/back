
const express = require("express");

const cors = require("cors");
const { connection } = require("./databaseConnection");
const { userRouter } = require("./Routes/userRouter");
const { projectRouter } = require("./Routes/projectRouter");
const { fileRouter } = require("./Routes/FileRouter");
const { authMiddleware } = require("./Middleware/AuthMiddleware");
require("dotenv").config();
const app = express();


app.use(cors());

app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get("/", (req, res) => {
  console.log("done")
  res.send({ message: "Server is up and running!" });
});
console.log("harshi")
app.use("/user", userRouter);
app.use(authMiddleware);
app.use("/project", projectRouter);
app.use("/file", fileRouter);

app.listen(4040, async () => {
  try {
    await connection;
    console.log("Connected to Database sussessfully.");
  } catch (error) {
    console.log("error :", error);
  }
  console.log(`Server running on port`);
});

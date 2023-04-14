import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (request, response) => {
  response.send("Hi, world!");
});

app.listen(3000, () => {
  console.log("The server has been started");
});

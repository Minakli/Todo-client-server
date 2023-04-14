import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (request, response) => {
  response.send("Hi");
});

app.listen(3000, function () {
  console.log("Started");
});

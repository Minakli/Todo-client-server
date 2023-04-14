import express from "express";
import cors from "cors";

let app = express();

app.use(cors());

app.get("/", (request, response) => {
  response.send("Hello");
});

app.listen(3000, () => {
  console.log("The server has been started");
});

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config.js");
const Task = require("./models/Task.js");

let app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (request, response) => {
  console.log(await request.body);
  try {
    let taskArr = Task.find();
    response.send(JSON.stringify(taskArr));
  } catch (error) {
    console.log(error);
  }
});

app.post("/", async (request, response) => {
  let showTmp = await request;
  console.log(showTmp.body);
  const objTask = new Task({
    task: showTmp.body.task,
    isChecked: showTmp.body.isChecked,
  });
  await objTask.save();
  response.status(200);
  response.send("success");
});

try {
  mongoose.connect(config, {});
  console.log("connected");
  mongoose.connection.once("open", () => {
    console.log("The connection is complete");
  });
} catch (error) {
  console.log("error");
}
app.listen(3000, () => {
  console.log(Task);
});

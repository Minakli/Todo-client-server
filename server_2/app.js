import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const uri =
  "mongodb+srv://MyBase:<password>@cluster0.wvs2rzz.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(cors());

app.get("/", (request, response) => {
  response.send("Hi, world!");
});

app.listen(3000, () => {
  console.log("The server has been started");
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

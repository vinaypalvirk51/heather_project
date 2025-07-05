const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Contact, Blog } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/contact", async (req, res) => {
  const newMessage = new Contact(req.body);
  await newMessage.save();
  res.status(201).send("Contact message received");
});

app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.json(blogs);
});

app.post("/blogs", async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.status(201).send("Blog added");
});

const PORT = 4001;
app.listen(PORT, () => console.log(`🚀 Contact-Blog Service running on ${PORT}`));

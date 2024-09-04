
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Story = require("./models/Story");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const uploadMiddleware = multer({ dest: "uploads/" });

const salt = bcrypt.genSaltSync(10);
const secret = process.env.secretKEY;
const mongoURI = process.env.MONGODB_URI;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



app.post("/sign-up", async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;
  try {
    const UserDoc = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(UserDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  const UserDoc = await User.findOne({ username });
  const passOK = bcrypt.compareSync(password, UserDoc.password);
  if (passOK) {
    jwt.sign({ username, id: UserDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: UserDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content, tag } = req.body;

    const postDoc = await Post.create({
      title,
      summary,
      content,
      tag,
      cover: newPath,
      author: info.id,
    });

    res.json(postDoc);
  });
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content, tag } = req.body;

    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }

    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    postDoc.tag = tag;
    postDoc.cover = newPath ? newPath : postDoc.cover;
    await postDoc.save();

    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  res.json(
    await Post.find().populate("author", ["username", "firstname", "lastname"])
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", [
    "username",
    "firstname",
    "lastname",
  ]);
  res.json(postDoc);
});

app.get("/tag/:tag", async (req, res) => {
  const { tag } = req.params;

  const postDoc = await Post.find({ tag: tag }).populate("author", [
    "username",
    "firstname",
    "lastname",
  ]);

  res.json(postDoc);
});

app.post("/story", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, content, tag, twitterEmbed, youtubeEmbed } = req.body;

    const storyDoc = await Story.create({
      title,
      content,
      tag,
      twitterEmbed,
      youtubeEmbed,
      cover: newPath,
      author: info.id,
    });

    res.json(storyDoc);
  });
});

app.put("/story", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, content, tag, twitterEmbed, youtubeEmbed } = req.body;

    const storyDoc = await Story.findById(id);
    const isAuthor = JSON.stringify(storyDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }

    storyDoc.title = title;
    storyDoc.content = content;
    storyDoc.tag = tag;
    storyDoc.cover = newPath ? newPath : "";
    storyDoc.twitterEmbed = twitterEmbed;
    storyDoc.youtubeEmbed = youtubeEmbed;
    await storyDoc.save();

    res.json(storyDoc);
  });
});

app.get("/story", async (req, res) => {
  res.json(
    await Story.find().populate("author", ["username", "firstname", "lastname"])
  );
});

app.get("/story/:id", async (req, res) => {
  const { id } = req.params;
  const storyDoc = await Story.findById(id).populate("author", [
    "username",
    "firstname",
    "lastname",
  ]);
  res.json(storyDoc);
});



app.listen(4000);

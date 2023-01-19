const express = require("express");
const UserModel = require("./Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser = require("body-parser");
const BugsModel = require("./Model/bug.Model");
mongoose.set("strictQuery", false);
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const { name, email, pass } = req.body;
  console.log(name, email, pass);
  const hash = await bcrypt.hash(pass, 10);
  const user = new UserModel({
    name,
    email,
    pass: hash,
  });
  await user.save();
  res.status(201).send("User Created sucessfully");
});
app.post("/signin", async (req, res) => {
  const { email, pass } = req.body;
  const user = await UserModel.findOne({ email });
  if (!!user) {
    const isPasswordCorrect = await bcrypt.compare(
      pass,
      user.pass
    );
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { id: user._id, name: user.email },
        "MONISH123"
      );
      return res.status(200).send({
        mess: "LOGIN SUCCESS",
        token: token,
        id: user._id,
      });
    } else {
      res.status(401).send("password is incorrect");
    }
  } else {
    res.status(404).send("User not found");
  }
});
app.get("bugs/:id", (req, res) => {
  const { id } = req.params;
});
app.get("/bugs", async (req, res) => {
  const bugs = await BugsModel.find();
  if (!!bugs) {
    res.send(bugs);
  } else {
    res.send("something went wrong");
  }
});
app.post("/bugs", async (req, res) => {
  const { title, level } = req.body;

  const product = new BugsModel({
    title,
    level,
  });
  await product.save();
  return res.status(201).send("Bug added");
});
mongoose
  .connect(
    "mongodb+srv://mohdmonish:123@cluster0.lm1amsh.mongodb.net/mock-11"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("server started on port 8080");
    });
  });

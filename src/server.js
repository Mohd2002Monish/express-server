const express = require("express");
const UserModel = require("./Model/user.model");
const ProductModel = require("./Model/product.model");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.set("strictQuery", false);
const app = express();

app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const { name, email, pass } = req.body;
  const user = new UserModel({
    name,
    email,
    pass,
  });
  await user.save();
  return res.status(201).send("User Created sucessfully");
});
app.post("/signin", async (req, res) => {
  const { email, pass } = req.body;
  const user = await UserModel.findOne({ email });
  if (!!user) {
    if (user.pass == pass) {
      return res.status(200).send("LOGIN SUCCESS");
    } else {
      res.send("password is incorrect");
    }
  } else {
    res.send("User not found");
  }
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

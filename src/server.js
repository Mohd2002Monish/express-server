const express = require("express");
const UserModel = require("./Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const res = require("express/lib/response");
mongoose.set("strictQuery", false);
const app = express();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("King");
});
app.post("/signup", async (req, res) => {
  const { name, email, pass } = req.body;
  const hash = await bcrypt.hash(pass, 10);
  const user = new UserModel({
    name,
    email,
    pass: hash,
  });
  await user.save();
  return res.status(201).send("User Created sucessfully");
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
      return res
        .status(200)
        .send({ mess: "LOGIN SUCCESS", token: token });
    } else {
      res.send("password is incorrect");
    }
  } else {
    res.send("User not found");
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
mongoose
  .connect(
    "mongodb+srv://mohdmonish:123@cluster0.lm1amsh.mongodb.net/mock-11"
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("server started on port 8080");
    });
  });

const express = require("express");
const UserModel = require("./Model/user.model");
const ProductModel = require("./Model/product.model");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.get("/product", async (req, res) => {
  const products = await ProductModel.find();
  if (!!products) {
    res.send(products);
  } else {
    res
      .status(404)
      .send("Something went worng pls try again");
  }
});
app.post("/product", async (req, res) => {
  const { name, price, img } = req.body;

  const product = new ProductModel({
    name,
    price,
    img,
    qty: 1,
  });
  await product.save();
  return res
    .status(201)
    .send("Product Added To the Collection");
});


app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  if (!!id) {
    const product = await ProductModel.deleteOne({
      _id: id,
    });
    res.send("Item Deleted");
  }
});
app.patch("/product/:id", async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;
  if (!!id && !!qty) {
    const product = await ProductModel.updateOne(
      { _id: id },
      { qty: qty }
    );
    res.send('qty is now changed');
  } else {
    res
      .status(404)
      .send("Something went worng please try again later");
  }
});
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
  if (user.pass == pass) {
    return res.status(200).send("LOGIN SUCCESS");
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

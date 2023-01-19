const { Schema, model } = require("mongoose");
const BugsSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ["Critical", "Major", "Medium", "Low"],
  },
});
const BugsModel = model("bugs", BugsSchema);
module.exports = BugsModel;

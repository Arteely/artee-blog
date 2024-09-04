const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tagSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  summary: String,
});

const TagModel = model("Tag", tagSchema);

module.exports = TagModel;

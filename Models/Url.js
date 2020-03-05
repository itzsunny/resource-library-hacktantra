const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    body: {
      type: String,
      trim: true,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Mentor"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);

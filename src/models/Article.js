const mongoose = require("mongoose");
const { Schema } = require("mongoose");

class Article {
  static instance = null;
  initSchema() {
    const schema = new Schema({
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    });

    try {
      mongoose.model("article", schema);
    } catch (e) {}
  }

  getInstance() {
    if (!Article.instance) {
      this.initSchema();
      Article.instance = mongoose.model("article");
    }
    return Article.instance;
  }
}

module.exports = { Article };

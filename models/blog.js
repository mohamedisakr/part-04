const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const schemaDefinition = {
  title: String,
  author: String,
  url: String,
  likes: Number,
};

const blogSchema = new mongoose.Schema(schemaDefinition);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);

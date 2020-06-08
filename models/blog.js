const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const schemaDefinition = {
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
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

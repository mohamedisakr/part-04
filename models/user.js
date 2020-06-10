const mongoose = require("mongoose");
// username , password and name.

const schemaDefinition = {
  username: String,
  name: String,
  passwordHash: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
};

const userSchema = new mongoose.Schema(schemaDefinition);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

mongoose.model(process.env.USER_MODEL_NAME, userSchema, process.env.USERS_COLLECTION_NAME);

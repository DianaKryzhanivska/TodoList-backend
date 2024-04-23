const { Schema, model } = require("mongoose");
const handleMongooseError = require("../services/handleMongooseError");
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const usersSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    match: emailRegex,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
    default: "",
  },
});

usersSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
};

const User = model("user", usersSchema);

module.exports = {
  User,
  schemas,
};

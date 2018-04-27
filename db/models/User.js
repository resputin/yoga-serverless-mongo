'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, select: false },
  todos: [
    {
      content: { type: String, required: true }
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;

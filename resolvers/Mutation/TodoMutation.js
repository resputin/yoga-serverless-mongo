'use strict';
const mongoose = require('mongoose');
const User = require('../../db/models/User');
const { authenticate } = require('../../utils/utils');
const { ObjectId } = mongoose.Types;

const createTodo = async (_, { content }, context) => {
  const userId = authenticate(context);
  try {
    const user = await User.findOne({ _id: userId });
    const newTodo = { _id: new ObjectId(), content };
    user.todos.push(newTodo);
    await user.save();
    return newTodo;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createTodo
};

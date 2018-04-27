'use strict';
const User = require('../../db/models/User');
const { authenticate } = require('../../utils/utils');

const todos = async (parent, args, context) => {
  const userId = authenticate(context);
  try {
    const user = await User.findOne({ _id: userId }).lean();
    return user.todos;
  } catch (err) {
    throw new Error(err);
  }
};

const todo = async (parent, { _id }, context) => {
  const userId = authenticate(context);
  try {
    const user = await User.findOne({ _id: userId }).lean();
    const todo = await user.todos.find(
      todo => todo._id.toString() === _id
    );
    return todo;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  todos,
  todo
};

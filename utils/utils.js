'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticate = context => {
  const Authorization = context.event.headers.Authorization;

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, config.SESSION_SECRET);
    return userId;
  }

  throw new Error('Not authorized');
};

module.exports = {
  authenticate
};

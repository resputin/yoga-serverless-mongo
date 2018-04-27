'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const { GraphQLServerLambda } = require('graphql-yoga');
const Query = require('./resolvers/Query/index');
const Mutation = require('./resolvers/Mutation/index');
const config = require('./config/config');

async function start() {
  const mongoClient = await mongoose.connect(config.MONGO_DB_URL);
  mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
  });
  return true;
}

const resolvers = {
  Query,
  Mutation
};

const lambda = new GraphQLServerLambda({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({ ...req })
});

exports.playground = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await start();
  return lambda.playgroundHandler(event, context, callback);
};
exports.server = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await start();
  return lambda.graphqlHandler(event, context, callback);
};


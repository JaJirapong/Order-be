const Hapi = require('hapi')
const Config = require('./src/config')
const Logger = require('./logger')
const log = require('./src/utils/log')
const fs = require('fs')
const mongoose = require("mongoose");

const server = new Hapi.Server(Config.server.connection)

mongoose
  .connect("mongodb://localhost:27017/Mongo-Test-Node")
  .then(() => {
    console.log("db started!");
  })
  .catch((e) => {
    console.log(e);
  });

server.ext('onRequest', function (request, h) {
  log.info(`Request: ${request.method}, ${request.path}`);
  return h.continue;
});

const start = async () => {
  try {
    await server.register(Config.server.registers)
    await server.start()
    console.log(`Server is running at ${server.info.uri}`)
  } catch (error) {
    console.log('Server error')
    console.log(error)
  }
}

start()

module.exports = server

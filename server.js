const Hapi = require('hapi')
const Config = require('./src/config')
const log = require('./src/utils/log')
const mongoose = require("mongoose");

const server = new Hapi.Server(Config.server.connection)

mongoose
  .connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => {
    console.log("db started!");
  })
  .catch((e) => {
    console.log(e);
  });

server.ext('onRequest', function (request, h) {
  log.info(`Request: ${request.method}, ${request.path}, ${request.payload}`);
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

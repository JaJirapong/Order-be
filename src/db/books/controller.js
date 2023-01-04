const { Books } = require('../index')
const { mongooseHandler } = require('../../utils/base-handler')

const create = {
  auth: false,
  handler: async (request) => {
    console.log('create')
    return mongooseHandler(request, () => Books.create(request.payload))
  }
}

const find = {
  auth: false,
  handler: async (request) => {
    console.log('find')
    return mongooseHandler(request, () => Books.find(request.payload))
  }
}

module.exports = {
  create,
  find
}
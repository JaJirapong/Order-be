const { redirector } = require('../libs/client')
const MODEL_NAME = 'books'

const create = async (data) => {
  return await redirector(MODEL_NAME, 'create', data)
}

const find = async (query = {}) => {
  return await redirector(MODEL_NAME, 'find', query)
}

module.exports = {
  create,
  find
}

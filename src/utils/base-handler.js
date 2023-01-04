/**
 *
 * @param  request this gets request. Just in case we want to log something
 * @param {*} mongooseMethod This method need to wrap with anonymous function before passing to avoid invoking before using it in here.
 */
const mongooseHandler = async (request, mongooseMethod) => {
  try {
    const result = await mongooseMethod()
    return {
      statusCode: 200,
      mongoResult: result
    }
  } catch (error) {
    return error
  }
}

const godMongooseHandler = async (request, mongooseMethod) => {
  try {
    const result = await mongooseMethod()
    return {
      statusCode: 200,
      method: request.params.method,
      table: request.params.schema,
      payload: request.payload,
      mongoResult: result
    }
  } catch (error) {
    return error
  }
}
module.exports = {
  mongooseHandler,
  godMongooseHandler
}

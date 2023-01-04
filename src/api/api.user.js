const {Books} = require('../db/model/index')

const userSignUp = {
  auth: false,
  handler: async (request) => {
    try {
      const books = {
        name: "test"
      }
      const bookData = await Books.create(books)
      return bookData;
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = {
  userSignUp
}
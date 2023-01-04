const Books = require('./schema/books')
const Promise = require('bluebird')

const create = (data) => {
    return new Promise((resolve, reject) => {
        const books = new Books(data)
        books.save(async (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const find = (query = {}) => {
    return new Promise((resolve, reject) => {
        Books.find(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = {
    create,
    find
}
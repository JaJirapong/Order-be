const Books = require('./controller')

const routes = [
    {
        method: 'POST',
        path: '/api/db/books/create',
        config: Books.create
    },
    {
        method: 'POST',
        path: '/api/db/books/find',
        config: Books.find
    }
]

module.exports = routes
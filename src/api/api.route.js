const API = require('./api.user')

const routes = [
    {
        method: 'GET',
        path: '/test-get',
        config: API.userSignUp
    }
]

module.exports = routes
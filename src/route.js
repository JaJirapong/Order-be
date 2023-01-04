/* eslint-disable  */
const glob = require('glob')

exports.plugin = {
  name: 'router',
  version: '1.0.0',
  register: (server, options) => {
    const files = glob.sync('./**/*.route.js', {
      absolute: true
    })

    console.log('Path the following...')
    /* Inject Routing */
    files.map((file) => {
      const routes = require(file)
      console.log('Path the following last...')
      routes.forEach((route) => 
        console.log(route.method + ' ' + route.path)
      )
      server.route(routes)
    })
  }
}

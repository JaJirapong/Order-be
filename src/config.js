const vision = require('vision')
const inert = require('inert')
const { Constants } = require('./constants')
const route = require('./route')

const server = {
  connection: {
    host: Constants.HOST || '0.0.0.0',
    port: Constants.PORT || 8000,
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        additionalHeaders: [
          'Access-Control-Allow-Origin', 
          'Access-Control-Request-Method', 
          'Access-Control-Allow-Methods', 
          'language', 
          'network']
      },
      validate: {}
    }
  },
  registers: [
    vision,
    inert,
    route,
    {
      plugin: require('hapi-i18n'),
      options: {
        locales: ['th', 'en'],
        directory: require('path').join(__dirname, '/locales'),
        languageHeaderField: 'language',
        defaultLocale: 'th'
      }
    }
  ]
}

const verboseValidate = async (request, h, err) => {
  err.output.payload.path = request.path
  err.output.payload.profileId = request.auth.credentials.profileId
  err.output.payload.email = request.auth.credentials.email
  console.error(err)
  throw err
}

if (process.env.NODE_ENV !== 'production') {
  server.connection.routes.validate.failAction = verboseValidate
}

module.exports = {
  server
}

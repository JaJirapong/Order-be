async function register(server) {
  await server.register({
    plugin: require('hapi-auth-jwt2')
  })

  const prodKey = ''

  const iotKey = ''
  const key = process.env.NODE_ENV === 'production' ? prodKey : iotKey
  server.auth.strategy('jwt-port', 'jwt', {
    key
  })
}

exports.plugin = {
  register,
  name: 'authentication',
  version: '1.0.0',
  once: true
}

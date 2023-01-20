const moment = require('moment')
const { createLogger, transports, format } = require('winston')

const colors = require('colors')
const util = require('util')
const axios = require('axios')
const querystring = require('querystring')

const logFormatDefault = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(info => `[${info.level}]${colors.blue(moment().format('YYYY-MM-DD HH:mm:ss'))}: ${info.message}`)
)
const logFormatNoDate = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(info => `${info.message}`)
)

const getBaseUrl = () => {
  return 'http://0.0.0.0:8080'
}
const redirector = async (table, method, payload, baseUrl = getBaseUrl()) => {
  try {
    const result = await axios({
      url: `${baseUrl}/api/db/${table}/${method}`,
      method: 'POST',
      data: payload
    })

    return result.data.resultData.mongoResult
  } catch (error) {
    const {
      response: {
        data: { reason }
      }
    } = error
    if (reason) {
      return reason
    } else {
      return error
    }
  }
}
const logger = createLogger({
  transports: [
    new transports.Console({
      format: logFormatDefault
    })
  ]
})
const loggerNoDate = createLogger({
  transports: [
    new transports.Console({
      format: logFormatNoDate
    })
  ]
})

const info = (...message) => {
  logger.info(message)
}

const error = error => {
  // eslint-disable-next-line no-console
  console.error(error)
  logger.error(util.inspect(error, true, 2, true))
}
const network = message => {
  logger.info(colors.magenta(message))
}

const debug = message => {
  if (process.env.NODE_ENV !== 'production') {
    logger.debug(colors.yellow(message))
  }
}

const wtf = message => {
  if (process.env.NODE_ENV !== 'production') {
    logger.debug(colors.america(message))
  }
}
/**
 *
 * @param {*} request
 * @param {*} options `{ showRequest: true } to show request log
 * @param {*} responseInfo
 * { showResponse: true } to show response log
 */
const hapiApi = (
  request,
  options = { showResponse: false, showRequest: true },
  responseInfo = {}
) => {
  try {
    const { showResponse = false, showRequest = true } = options
    const { received, id } = request.info
    const { timestamp: responded = 0 } = responseInfo

    if (!request.response) {
      logger.error('response is null in Logger.hapiApi()')
    }
    const msToDate = timestamp => {
      return colors.blue(moment(timestamp).format('YYYY-MM-DD HH:mm:ss.SSS'))
    }

    // console.log(util.inspect(request, true, 2, true))
    let message = ''
    message += `[${msToDate(received)}]`
    message += ' '
    message += `${colors.magenta(id)}`
    message += ' '
    message += colors.yellow(request.method.toUpperCase())
    message += ' <-- '
    message += request.url.path.replace('api/', '')
    message += '\n'
    if (showRequest) {
      if (request && request.headers) {
        const authorization = request.headers['authorization']
        if (authorization) {
          message += 'Authorization:\n'
          message += authorization
          message += '\n'
        }
      }
      message += 'Payload:\n'
      message += request.payload
        ? JSON.stringify(request.payload, null, 2)
        : '{No Payload}'
      message += '\n'
    }

    const { response } = request

    if (!response) {
      message +=
        'response is missing in the server.js logger. Server wont crash though'
      loggerNoDate.info(message)
      return
    }
    const { statusCode } = response
    const coloredStatusCode =
      statusCode.toString().charAt(0) == '2'
        ? colors.green(statusCode)
        : colors.red(statusCode)
    if (showResponse) {
      message += 'Response:\n'
      message += JSON.stringify(JSON.parse(response._payload._data), null, 1)
    }

    if (response._error) {
      message += 'Error:\n'
      message += `${colors.red(response._error.stack)}\n`
    }
    message += '\n'
    message += `[${msToDate(responded)}]`
    message += ' '
    message += `${colors.magenta(id)}`
    message += ' '
    message += coloredStatusCode
    message += ' --> '
    message += request.url.path.replace('api/', '')
    message += ' '
    message += `(${responded - received}ms)`

    loggerNoDate.info(message)
  } catch (error) {
    logger.error(util.inspect(error, true, 2, true))
  }
}
const generateLog = (req, startTime, response, err) => {
  const now = moment()
  const { error } = err
  let errorLog = {
    message: error ? error['message'] : null,
    instance: error ? error['name'] : null
  }
  if (error && error['developerMessage']) {
    errorLog = stringify(error)
  }

  // extract email as userId from JWT token. Already handle when rockettoken is undefined
  const rocketToken = req.headers['rocketToken'] || req.headers['rockettoken'] || req.headers['authorization']
  const { payload: { email: userId } = {} } =
    JWT.decode(rocketToken, { complete: true }) || {}
  const andromedaUserId =
    req.headers['andromedauserid'] || req.headers['andromedaUserId']
  const body = shouldEncrypt(req.params.url, req.headers, req.payload)
  let data
  if (req.params.url === 'api-dir/mmc_RKSMFoSRAR') { // xml format
    data = {
      timestamp: now.format(),
      requestMethod: req.method.toUpperCase(),
      requestUri: req.params.url,
      requestHeaders: stringify(req.headers),
      requestParams: stringify(req.query),
      requestBody: stringifyNew(body),
      responseBody: stringifyNew(response),
      responseStatus: response['resultCode'],
      responseTime: moment.duration(now.diff(startTime)).asMilliseconds(),
      userId: userId || andromedaUserId,
      network: req.headers.network,
      error: errorLog
    }
  } else {
    data = {
      timestamp: now.format(),
      requestMethod: req.method.toUpperCase(),
      requestUri: req.params.url,
      requestHeaders: stringify(req.headers),
      requestParams: stringify(req.query),
      requestBody: stringify(body),
      responseBody: stringify(response),
      responseStatus: response['resultCode'],
      responseTime: moment.duration(now.diff(startTime)).asMilliseconds(),
      userId: userId || andromedaUserId,
      network: req.headers.network,
      error: errorLog,
      serviceName: getServiceName(body)
    }
  }
  return data
}
const writeAPILog = (req, startTime, response, err) => {
  const data = generateLog(req, startTime, response, err)
  if (
    req.params.url
      .split('/')
      .slice(-2)
      .join('/') !== 'api-Log/create' &&
    req.params.url.indexOf('/api/db') === -1
  ) {
    // prevent recursive writeAPILog
    redirector('api-Log', 'create', data)
  }
}
function replacer(key, value) {
  if (/base64/gi.test(key)) {
    return '(base64 detected. removed)'
  }
  // \\\"bankCode\\\":\\\"002\\\"
  // parse again so
  if (typeof value === 'string' && /\W*"\w+\W*":\W*"\w+\W*"/.test(value)) {
    return JSON.parse(value)
    //successcode=0&Ref=NUMOBILE20190313120757262&
  } else if (typeof value === 'string' && /&?\w+=.+&?/.test(value)) {
    return querystring.parse(value)
  } else {
    return value
  }
}
const stringify = data => {
  try {
    let jsonData = JSON.stringify(data, replacer)
    if (jsonData === '{}' || jsonData === '[]' || !data || data === null) {
      return ''
    } else {
      return jsonData.replace(/\|/g, '\\:').trim()
    }
  } catch (err) {
    return 'Error: ' + err.message
  }
}

const getServiceName = data => {
  if(!data || data === null){
    return ""
  }
  if(data.requestHeader && data.requestHeader.customerOrderType){
    return data.requestHeader.customerOrderType
  }
  return ""
}

const stringifyNew = rawData => {
  try {
    if (!rawData) {
      return ''
    }
    const { data } = rawData
    let jsonData
    if (data) {
      jsonData = JSON.stringify(data, replacer)
    } else {
      jsonData = JSON.stringify(rawData, replacer)
    }
    if (jsonData === '{}' || jsonData === '[]') {
      return ''
    } else {
      return jsonData.replace(/\|/g, '\\:').trim()
    }
  } catch (err) {
    return 'Error: ' + err.message
  }
}

const shouldEncrypt = (uri, headers, payload) => {
  const { encrypt } = require('./crypto-utils')
  try {
    const safePayload = payload
    const apiName = uri.split('/').pop()
    if (apiName === 'mmc_RKResetPassword') {
      const { credential } = safePayload
      if (credential) {
        const { value } = credential
        if (value) {
          safePayload.credential.value = encrypt(value)
        }
      }
    } else if (apiName === 'mmc_RKSendSMS') {
      const { visibility } = headers
      const { content } = safePayload
      if (visibility === 'hidden') {
        safePayload.content = encrypt(content)
      }
    }
    return safePayload
  } catch (err) {
    return 'Error: ' + err.message
  }
}

const slack = (data, by = '') => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  try {
    const getMessage = data => {
      if (typeof data === 'object' || Array.isArray(data)) {
        return util.inspect(data, {
          showHidden: true,
          depth: null
        })
      } else {
        return data
      }
    }

    let attachments = []
    if (by) {
      attachments = [
        {
          text: `<@${by}>`,
          mrkdwn_in: ['text']
        }
      ]
    }
    axios({
      method: 'POST',
      url:
        'https://hooks.slack.com/services/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',
      data: {
        text: `\`\`\`${getMessage(data)}\`\`\``,
        mrkdwn: true,
        attachments
      }
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    axios({
      method: 'POST',
      url:
        'https://hooks.slack.com/services/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',
      data: {
        text: 'some thing wrong with the slack message',
        color: 'danger'
      }
    })
  }
}

module.exports = {
  info,
  error,
  network,
  debug,
  wtf,
  generateLog,
  writeAPILog,
  redirector,
  hapiApi,
  slack
}

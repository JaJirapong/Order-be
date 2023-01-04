const axios = require('axios')

const getBaseUrl = () => {
  return 'http://0.0.0.0:8080'
}

const filterMongoResult = result => {
  if (
    result.data &&
    result.data.resultData &&
    result.data.resultData.hasOwnProperty('mongoResult')
  ) {
    //base case admd wrap data inside resultData with mongoResult
    return result.data.resultData.mongoResult
  } else if (result.data && result.data.hasOwnProperty('mongoResult')) {
    //developer test case, not wrap inside resultData
    return result.data.mongoResult
  } else if (
    result.data &&
    (typeof result.data.resultData === 'boolean' || result.data.resultData)
  ) {
    //admd wrap data. The data is not inside mongoResult
    return result.data.resultData
  } else if (result.data) {
    //just return what it gets
    return result.data
  }
}

const filterCrudResult = result => {
  if (result.data && result.data.resultData) {
    return result.data.resultData
  } else if (result.data && result.data) {
    //developer test case, not wrap inside resultData
    return result.data
  }
}

const baseRedirector = async (
  table,
  method,
  payload,
  baseUrl,
  injectedFilter
) => {
  try {
    const result = await axios({
      url: `${baseUrl}/api/db/${table}/${method}`,
      method: 'POST',
      data: payload
    })
    return injectedFilter(result)
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.reason
    ) {
      const {
        response: {
          data: { reason }
        }
      } = error
      console.error('baseRedirectorError', reason)
      return reason
    } else {
      console.error('baseRedirectorError else case:', error)
      return error
    }
  }
}

const redirector = async (table, method, payload, baseUrl = getBaseUrl()) => {
  return baseRedirector(table, method, payload, baseUrl, filterMongoResult)
}

const redirectorCrud = async (
  table,
  method,
  payload,
  baseUrl = getBaseUrl()
) => {
  return baseRedirector(table, method, payload, baseUrl, filterCrudResult)
}

module.exports = {
  redirector,
  redirectorCrud
}

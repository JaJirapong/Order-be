
const success = (data, meta = {}) => {
  return {
    data: {
      ...data
    },
    meta
  }
}

const implementError = (transaction, lang = 'en') => {
  const detail = lang === 'en' ? '' : ''

  return {
    data: {
      transaction
    },
    errors: [{
      code: 50001,
      detail,
      lang
    }]
  }
}


module.exports = {
  success,
  implementError,
}
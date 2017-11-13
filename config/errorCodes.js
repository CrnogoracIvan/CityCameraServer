module.exports.codes = {
  'BAD_REQUEST': {
    code: '400',
    message: 'Bad request'
  },
  'FORBIDDEN': {
    code: '403',
    message: 'You are not authorized'
  },
  'NOT_FOUND': {
    code: '404',
    message: 'Not found'
  },
  'INTERNAL_ERROR': {
    code: '500',
    message: 'Internal server error'
  },
  'ALREADY_REGISTERED': {
    code: '406',
    message: 'You are already registered'
  },
  'MONGO_ERROR': {
    code: '500',
    message: 'Database error'
  },
  'EXPIRED': {
    code: '401',
    message: 'This token has expired. Renew it'
  },
    'WRONG_CREDENTIALS': {
    code: '401',
    message: 'Wrong username or password'
  }
};
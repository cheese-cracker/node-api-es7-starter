'use strict'

const {
  PORT = 8080,
  BODY_LIMIT = '5mb',
  ALLOW_CORS_ORIGIN = '*',
  ALLOW_CORS_METHODS = ''
} = process.env

// AWS Config Part
const {
    S3_KEY = '',
    S3_SECRET = '',
    BUCKET_REGION ='',
    BUCKET_NAME=''
} = process.env;

const MONGODB_PORT = 27017

const SERVER_CONFIG = {
  PORT,
  BODY_LIMIT,
  ALLOW_CORS_ORIGIN,
  ALLOW_CORS_METHODS,
  MONGODB_PORT,
  S3_KEY,
  S3_SECRET,
  BUCKET_REGION,
  BUCKET_NAME
}

export default SERVER_CONFIG

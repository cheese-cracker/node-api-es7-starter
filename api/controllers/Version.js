'use strict'

import { ResponseBody } from '../helpers'
import {generateGetUrl, generatePutUrl} from '../helpers/awsPresigner'

const ImageController = {
    findById,
    create,
    listNItems,
}

async function findById (request, response, next) {
  // Dunno if req.query.Key is allows
  const data = await generateGetUrl(req.query.Key)
  const responseBody = new ResponseBody(200, 'Version Check Successful', data)
  response.body = responseBody
  process.nextTick(next)
}

async function create (request, response, next) {
  const {Key, ContentType} = req.query
  const data = await generatePutUrl(Key, ContentType)
  const responseBody = new ResponseBody(200, 'Version Check Successful', data)
  response.body = responseBody
  process.nextTick(next)
}

async function listNItems (request, response, next) {
  const {Key, ContentType} = req.query
  const data = await generatePutUrl(Key, ContentType)
  const responseBody = new ResponseBody(200, 'Version Check Successful', data)
  response.body = responseBody
  process.nextTick(next)
}
 
export default ImageController

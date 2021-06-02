'use strict'

import Express from 'express'
import cors from 'cors'
import { expressUtils } from '../helpers'
import { ImageController } from '../controllers'

const ImageRouter = new Express.Router()
const {
    findById,
    listNItems,
    create,
    deleteById,
} = ImageController

const { reqHandler, resHandler } = expressUtils
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler
const { setHeaders } = resHandler

ImageRouter.use(extractHeaders)

// Use cors for generating/etc
ImageRouter.use(cors)

// Get 1 Image
ImageRouter.get('/', routeSanity, asyncWrapper(findById))

// List N images
ImageRouter.get('/', routeSanity, asyncWrapper(listNItems))

// Delete by Id
ImageRouter.delete('/', routeSanity, asyncWrapper(listNItems))


ImageRouter.use(setHeaders)

export default ImageRouter

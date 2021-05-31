'use strict'

import Express from 'express'
import { expressUtils } from '../helpers'
import { TicketController } from '../controllers'

const TicketRouter = new Express.Router()
const { listN, findById, updateById, create, deleteById } = TicketController

const { reqHandler, resHandler } = expressUtils
const { extractHeaders, routeSanity, asyncWrapper } = reqHandler
const { setHeaders } = resHandler

TicketRouter.use(extractHeaders)

// List upto 100 tickets
TicketRouter.get('/', routeSanity, (req, res) =>{
    return res.redirect(req.baseUrl + '/list/100')
})

TicketRouter.get('/list', routeSanity, (req, res) =>{
    return res.redirect(req.baseUrl + '/list/100')
})

// Ticket Query
TicketRouter.get('/:id', routeSanity, asyncWrapper(findById))

// Ticket List N
TicketRouter.get('/list/:num([0-9]+?)', routeSanity, asyncWrapper(listN))

// Update By ID
TicketRouter.put('/:id/update', routeSanity, asyncWrapper(updateById))

// Create
TicketRouter.post('/create', routeSanity, asyncWrapper(create))

// Delete
TicketRouter.delete('/:id/delete', routeSanity, asyncWrapper(deleteById))

TicketRouter.use(setHeaders)

export default TicketRouter

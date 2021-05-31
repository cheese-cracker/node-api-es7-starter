'use strict'

import { ResponseBody } from '../helpers'
import { TicketModel } from '../models'

const TicketController = {
    listN,
    findById,
    updateById,
    create,
    deleteById
}

export default TicketController

async function findById (request, response, next) {
  const idVal = request.params.id
  const data = await TicketModel.findById(idVal)
  console.log('FindbyID for ', data)
  let responseBody
  if(data){
    responseBody = new ResponseBody(200, 'Ticket Query Successful', data)
  }else{
    responseBody = new ResponseBody(404, 'Ticket Query Not Found')
  }
  response.body = responseBody
  process.nextTick(next)
}

async function create (request, response, next) {
  const data = request.body
  console.log(data)
  const newTicket = new TicketModel(data)
  await newTicket.save((err, thisTicket) =>{
    if(err){
      return console.log("Error writing to DB", err)
    }else{
      console.log(`New Ticket ${thisTicket.name} with id ${thisTicket.id} successfully saved!`)
    }
  })
  const responseBody = new ResponseBody(200, 'Ticket successfully created', data)
  response.body = responseBody
  process.nextTick(next)
}


async function updateById (request, response, next) {
  const idVal = request.params.id
  const data = request.body
  await TicketModel.findByIdAndUpdate(idVal, data, (err, res)=>{
    if(err){
      return console.log('504 Error in Update!')
    }else{
      console.log('Successfully Updated!')
    }
  })
  if(data){
    response.body = new ResponseBody(200, 'Ticket successfully updated', idVal)
  }else{
    responseBody = new ResponseBody(404, 'Ticket update Not Found')
  }
  process.nextTick(next)
}

async function deleteById(request, response, next) {
  const idVal = request.params.id
  const data = await TicketModel.findByIdAndRemove(idVal, (err, res)=>{
    if(err){
      return console.log('504 Error in Deletion!')
    }else{
      console.log('Successfully Removed!')
    }
  })
  const responseBody = new ResponseBody(200, 'Ticket successfully deleted', idVal)
  response.body = responseBody
  process.nextTick(next)
}

async function listN (request, response, next) {
    const n = request.param.num
    if(n > 1000){
        return console.log('Error way to large list required')
    }
    const data = await TicketModel.find().sort({'updatedAt' : -1}).limit(n)
    const responseBody = new ResponseBody(200, 'List of recent Tickets provided', data)
    response.body = responseBody
    process.nextTick(next)
}

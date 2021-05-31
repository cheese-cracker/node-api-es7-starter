'use strict'

// Ticket Model
const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema(
    {   name: String,
        movie: String,
        description: String,
    },
    {timestamps: true}
)
ticketSchema.methods.show = () =>{
    console.log(`Movie: ${this.movie} Name: ${this.name} which is ID: ${this.id}`)
}

const TicketModel = mongoose.model('Ticket', ticketSchema);
export default TicketModel;

'use strict'

import Express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import Routes from './api/routes'
import { SERVER_CONFIG } from './config'
import mongoose from 'mongoose'
import startServer from './startServer'

const { BODY_LIMIT, ALLOW_CORS_ORIGIN, ALLOW_CORS_METHODS } = SERVER_CONFIG
const app = new Express()
const corsOptions = {
  origin: ALLOW_CORS_ORIGIN,
  methods: ALLOW_CORS_METHODS
}

// Middleware Initializations
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: BODY_LIMIT }))
app.use(bodyParser.urlencoded({ limit: BODY_LIMIT, extended: true }))
app.use(helmet())

// Connect Database
mongoose.connect(`mongodb://localhost:${SERVER_CONFIG.MONGODB_PORT}`,
    {useNewUrlParser: true, useUnifiedTopology: true})

// mongoose.connection -> EventEmitter for DB connection
const dbConnect = mongoose.connection
dbConnect.on('error', () => {console.log("Connection Error with DB") })
dbConnect.once('open', () =>{console.log(`Successfully connected with Mongodb on PORT:${SERVER_CONFIG.MONGODB_PORT}`)} )

// Initialize Routes
Routes.init(app)

// Start Server
startServer(app)

// For testing
module.export = app

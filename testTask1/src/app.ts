import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Router } from './router'
import { ErrorHandler, NotFoundErrorHandler } from './middlewares'

const app = express()
app.use(bodyParser.json())

// register express routes from defined application routes
app.use('/api', Router)

app.use(NotFoundErrorHandler)
app.use(ErrorHandler)

export default app

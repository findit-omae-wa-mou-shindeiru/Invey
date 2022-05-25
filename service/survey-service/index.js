import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {createSurvey} from './controllers/create-survey.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
})

app.post('/create-survey', createSurvey)

app.listen(8888, () => {
  console.log("Up and running");
})

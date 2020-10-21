import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

const NO_CACHE = false
 if(NO_CACHE) {
     app.use(function(req,res,next){
         res.header('Cache-Control','private', 'no-cache', 'no-store','must-revalidate')
         res.header('Expires','-1')
         res.header('Pragma','no-cache')
         next()
     })
 }

 app.use(cors())
 app.use(bodyParser.json())


 const PORT = process.env.PORT || 8500 
 app.listen(PORT,function () {
     console.log('Dev Express server listening on port:' + PORT)
 })
require('dotenv').config({
    path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env"
})

const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const cors = require('cors')
const bodyParser = require('body-parser')

class AppController {
    constructor() {
        this.express = express()

        this.dbConnect()
        this.middlewares()
        this.routes()
    }


    middlewares() {
        this.express.use(cors())
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({extended: false}))
    }

    routes() {
        this.express.use(require('./routes/express.routes'))
    }
    
    dbConnect() {
        const database = `mongodb+srv://dev:sc4l3@devcluster-dxopc.gcp.mongodb.net/scale`

        mongoose.connect(database, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('mongo connected')
    }

}

module.exports = new AppController().express

const express= require('express')
const cors  = require('cors');
const { config } = require('./config')
const {mongooseHelper} = require('./db');
const Router = require('../routes/router');
const swaggerUI = require("swagger-ui-express");
const docs = require('./docs');
const app = express()
class Server{
    constructor(){
        this.app = app
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(express.json())
        this.app.use(cors());
        this.app.use(express.static(__dirname + '/public'))
        this.app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));
    }
 
    handle400(){
        this.app.use((err, res, next)=>{
            if(err && err.status === 400 && 'body' in err)
                return res.status(400).json({error: true, message: "Mauvaise requête", data: null})
            next()
        })
        return this
    }

    handle404(){
        this.app.use((_err, res)=>{
            return res.status(404).json({error: true, message: "route introuvable ou inexistante", data: null})
        })
        return this
    }

    setRoutes(Router){
        new Router(app).getRoutes()     // new CustomerRoutes(app)
        return this
    }

    startServer(){
        this.app.listen(config.serverport,()=>{
            console.log(`server is running on : ${config.serverurl}:${config.serverport}`);            
            mongooseHelper.getInstance()
        })
        return this
    }
}
module.exports = Server
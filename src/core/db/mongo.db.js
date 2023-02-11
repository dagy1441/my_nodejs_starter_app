const mongoose = require('mongoose')
const { config } = require('../config')
class MongooseHelper{
    constructor(url, port, dbname){
        this.url = url
        this.dbname = dbname
        this.port = port
        this.instance = null
    }
    async getInstance(){
        if(this.instance){
            return instance
        }
        else{
            await this.connect()
        }
    }
    async connect(){
        try{
            let instance  = await mongoose.connect(`${this.url}:${this.port}/${this.dbname}`)
            console.log("Instance MongoDB Démarrée")
            return instance

        }catch(err){
            console.log(err.message)
        }
    }
}
const mongooseHelper = new MongooseHelper(config.dburl, config.dbport, config.dbname)
module.exports = mongooseHelper
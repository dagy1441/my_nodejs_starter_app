const { body } = require('express-validator');


const {Router} = require('../../../routes');
const { Utils } = require('../../../utils');
const {UserController} = require('../http/controllers')
const {Validator,UserData} = require('../http/middleware')

class UserRoutes extends Router{
    constructor(app){
        super(app)   
    }
    getRoutes(){
        this.app.get('/users/test', (_req, res) =>{
            return Utils.apiResponse(res, UserController.register())
        })
        
        this.app.post('/api/register',
        UserData.register(),
        Validator.validate,
        (req, res) =>{
            const data = req.body
            return Utils.apiResponse(res, UserController.register(data))
        })
        // this.app.update('/user/update',
        // (req, res)=>{
        //     const data = req.body
        //     return Utils.apiResponse(res, new Promise.resolve(body))
        // })
    }

}
module.exports = UserRoutes

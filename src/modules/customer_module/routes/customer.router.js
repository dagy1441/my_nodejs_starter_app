const { body } = require('express-validator');
const CustomerController = require('../http/controller/customer.controller');
const {Router} = require('../../../routes');
const { Utils } = require('../../../utils');
const { CustomerData } = require('../http/middleware');



class CustomerRoutes extends Router {
    
    constructor(app){
        super(app)   
    }

    getRoutes(){

        this.app.get('/customers/test', (req, res) =>{
            return Utils.apiResponse(res, CustomerController.hello())
        })
        
        this.app.post('/customers/signup',
        CustomerData.checkExistEmail,
        CustomerData.checkExistPhone,
        async (req, res) =>{
            const customer = req.body;
            const request = await CustomerController.signUp(customer)
            return Utils.apiResponse( res, request )
        })
    }
}
module.exports = CustomerRoutes
const { Utils } = require("../../../../utils");
const { DataResponse } = require("../../../../utils/utils");
const { CustomerModel } = require("../../models");
const CustomerService = require("../../service");

class CustomerController {

    constructor(service){
        this.service = new CustomerService();
        console.log(this._service);
    }

    static async hello(){
        console.log(this._service);

        let customer = new CustomerModel({login: "dagy", password:"dagy"})
        await customer.save();
        return Promise.resolve({
            status: 200, 
            error: false, 
            message: "User crée avec succès", 
            data: customer})
    }

    static async signUp(customer) {
         console.log(customer);
         try {
            customer = await CustomerService.signUp(customer);
            console.log("------------- in controller -----------------");
    
            return Promise.resolve({status: 200, error: false, message: "User crée avec succès", data: customer})
         } catch (error) {
            console.log(error.message);
            return Promise.resolve({status: 500, error: true, message: "une erreur interne s'est produite", data: null})
        }
    }


}

module.exports = CustomerController;

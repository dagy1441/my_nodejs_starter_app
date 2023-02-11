const { Utils } = require("../../../utils");
const { APIError, STATUS_CODES } = require("../../../utils/app-errors");
const { DataResponse } = require("../../../utils/utils");
const { CustomerRepository } = require("../repository");

class CustomerService {
    
    constructor(){
        this.repository = new CustomerRepository();
    }

   static async signUp(customer){
        
        const { email, password, phone } = customer;
        
        try{

            console.log("------------- in service -----------------");

            // create salt
            let salt = await Utils.GenerateSalt();
            
            let userPassword = await Utils.GeneratePassword(password, salt);

            const existingCustomer = await this.repository.CreateCustomer(
                { email, password: userPassword, phone, salt});
            
            console.log('client crée', existingCustomer);
   
            const token = await Utils.generateSignature({ email: email, _id: existingCustomer._id});

            const dataResponse = Utils.dataResponse({id: existingCustomer._id, token });

            return dataResponse;

        }catch(err){
            console.log(err);
            throw new APIError('Data Not found', err)
        }

    }

    async addNewAddress(_id,userInputs){
        
        const { street, postalCode, city,country} = userInputs;
        
        try {
            const addressResult = await CustomerRepository.createCustomer({ _id, street, postalCode, city,country})
            return Utils.dataResponse(addressResult);
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
        
    }
    
}

module.exports = CustomerService
const { Utils } = require("../../../utils")
const { APIError } = require("../../../utils/app-errors")
const AddressRepository = require("../repository/address.repository")

const addressRepository = AddressRepository

class AddressService {
    constructor(){
        this.repository = addressRepository
    }

    static async createAddress(address){
        const {postalCode, idCountry} = address
        try {
            const addressResult = await this.repository.CreateAddress({ _id, })
            return Utils.dataResponse(addressResult);
        } catch (error) {
            console.log(err.message);
            throw APIError(
                'API Error', 
                STATUS_CODES.INTERNAL_ERROR, 
                'Unable to Find Country')
        }
    }
}

module.exports = AddressService
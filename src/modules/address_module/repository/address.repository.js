const { APIError, STATUS_CODES } = require("../../../utils/app-errors");
const { AddressModel } = require("../models");

class AddressRepository {

    static async createAddress({ postalCode, idCountry }){
        try{
            const country = await CurrencyModel.findById(idCountry);

            if (country) {
                const address = new AddressModel({
                    postalCode,
                    idCountry
                })
                const addressResult = await address.save();
                return addressResult;
            }
        }catch(err){
            throw APIError(
                'Erreur de création',
                STATUS_CODES.INTERNAL_ERROR,
                'Impossible de créer une adresse')
        }
    }

    static async findAll(){
        try{
            return await AddressModel.find().sort({ createdAt: -1 }).populate('idCountry');
        }catch(err){
            console.log(err.message);
           throw APIError(
            'Erreur de base de données', 
            STATUS_CODES.INTERNAL_ERROR, 
            'Impossible d\'obtenir les adresses')
        }
    }

    static async findById(id){
        try{
            return await AddressModel.findById(id).populate('idCountry');
        }catch(err){
            console.log(err.message);
            throw APIError(
                'Erreur de base de données', 
                STATUS_CODES.INTERNAL_ERROR, 
                'Impossible d\'obtenir l\' adresse')
        }

    }

    static async deleteById(id){
        try{
            return await AddressModel.findByIdAndRemove(id);
        }catch(err){
            console.log(err.message);
            throw APIError(
                'Erreur de base de données', 
                STATUS_CODES.INTERNAL_ERROR, 
                'Impossible de supprimer adresse')
        }

    }

}

module.exports = AddressRepository;
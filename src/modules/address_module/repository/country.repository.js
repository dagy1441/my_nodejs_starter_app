const { STATUS_CODES } = require("../../../utils/app-errors");
const CurrencyModel = require("../../currency_service/models/currency.model");
const { CountryModel } = require("../models");


class CountryRepository {

    static async createCountry({ code, shortLabel, longLabel, city, idCurrency}){
        try{

            const currency = await CurrencyModel.findById(idCurrency);

            if (currency) {
                const country = new CountryModel({
                    code,
                    shortLabel,
                    longLabel,
                    city,
                    idCurrency,
                });

            return await country.save();

            }
  
        }catch(err){
            console.log(err.message);
            throw APIError(
                'Erreur de base de données',
                STATUS_CODES.INTERNAL_ERROR,
                'Impossible de créer un pays')
        }
    }

    static async update(id, country) {
        try {
          // const currency = new CurrencyModel();
          let expectedCountry = await CountryModel.findById(id);
          let updatedCountry = Object.assign(expectedCountry, country)
          await updatedCountry.save();
          return updatedCountry;
        } catch (error) {
          console.log(error.message);
          throw APIError(
            "Erreur de base de données",
            STATUS_CODES.INTERNAL_ERROR,
            "Impossible de modifier la devise"
          );
        }
      }

    static async findAllCountry(){
        try{
            return await CountryModel.find().sort({ createdAt: -1 }).populate('idCurrency');
        }catch(err){
            console.log(err.message);
           throw APIError(
            'Erreur de base de données', 
            STATUS_CODES.INTERNAL_ERROR, 
            'Impossible d\'obtenir les pays')
        }
    }

    static async findById(id){
        try{
            return await CountryModel.findById(id).populate('idCurrency');
        }catch(err){
            console.log(err.message);
            throw APIError(
                'Erreur de base de données', 
                STATUS_CODES.INTERNAL_ERROR, 
                'Impossible d\'obtenir le pays')
        }
    }

    static async findOne(params){
        try{
            return await CountryModel.findOne({}).populate('idCurrency');
        }catch(err){
            console.log(err.message);
            throw APIError(
                'Erreur de base de données', 
                STATUS_CODES.INTERNAL_ERROR, 
                'Impossible d\'obtenir le pays')
        }
    }



    static async deleteById(id){
        try{
            return await CountryModel.findByIdAndRemove(id);
        }catch(err){
            console.log(err.message);
            throw APIError(
                'Erreur de base de données', 
                STATUS_CODES.INTERNAL_ERROR, 
                'Impossible de supprimer le pays')
        }
    }


}

module.exports = CountryRepository;
const { Utils } = require("../../../utils");
const { APIError } = require("../../../utils/app-errors");
const CurrencyRepository = require("../../currency_service/repository/currency.repository");
const CountryRepository = require("../repository/country.repository");


class CountryService {

    constructor(){}

    static async saveCountry(country){
        const {code, shortLabel, longLabel, idCurrency}=country;
        try {
           const createdCountry = await CountryRepository.createCountry({code, shortLabel, longLabel, idCurrency})    
            return Utils.dataResponse(createdCountry );         
        } catch (error) {
            throw new APIError('Erreur lors de la création', error.message)
        }
    }

    static async updateCountry(country) {
        let{id, code, shortLabel, longLabel, idCurrency} = country;
        try {
            const findedCountry = await CountryRepository.findById({id});
            if (!findedCountry) {
                throw new APIError('Pays non trouvée')
            }

            const findedCurrency = await CurrencyRepository.findById({id:idCurrency});
            if (!findedCurrency) {
                throw new APIError('Devise non trouvée')
            }

            findedCountry.code = code;
            findedCountry.shortLabel = shortLabel
            findedCountry.longLabel = longLabel
            findedCountry.idCurrency = idCurrency

            const updatedCountry = await CountryRepository.update(findedCountry._id, findedCountry)
            
            return Utils.dataResponse(updatedCountry); 
        } catch (error) {
            console.log(error);
            throw new APIError('Erreur lors de la modification', error.message)
        }
    }

    static async getAllCountry(){
        try {
            console.log("-------------| in Service |  ----------------- ");
            const countries = await CountryRepository.findAll();
            return Utils.dataResponse(countries);
        } catch (error) {
            console.log(error);
            throw new APIError('Données non trouvées', error.message)
        }
    }

    static async getCountryById({id}){
        try {
            const country = await CountryRepository.findById({id});
            if (!country) {
                throw new APIError('Pays non trouvé')
            }
            return Utils.dataResponse(country);
        } catch (error) {
            console.log(error);
            throw new APIError('Données non trouvées', error.message)
        }
    }

    static async deleteCountryById(inputId ){
        try {
            console.log("-------------| in Service |  ----------------- ");
            const {id} = inputId
            const country = await CountryRepository.deleteById(id);
            if (!country) {
                throw new APIError('Pays non trouvée')
            }
            return Utils.dataResponse(country);
        } catch (error) {
            console.log(error);
            throw new APIError('Impossible de supprimer la donnée', error)
        }
    }

}

module.exports = CountryService
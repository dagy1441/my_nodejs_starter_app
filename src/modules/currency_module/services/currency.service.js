const { Utils } = require("../../../utils");
const { APIError } = require("../../../utils/app-errors");
const CurrencyRepository = require("../repository/currency.repository");

class CurrencyService {
    
    constructor( repository){
        repository = new CurrencyRepository();
    }

    static async createCurrency(currency) {
        const{code, label} = currency;
        try {
            const existingCurrency = await CurrencyRepository.createCurrency({code, label})
            return Utils.dataResponse(existingCurrency ); 
        } catch (error) {
            throw new APIError('Erreur lors de la création', error.message)
        }
    }

    static async updateCurrency(currency) {
        let{id, code, label} = currency;
        try {
            const currency = await CurrencyRepository.findById({id});
            if (!currency) {
                throw new APIError('Device non trouvée')
            }

            currency.code = code;
            currency.label = label

            const existingCurrency = await CurrencyRepository.update(currency._id, currency)
            
            return Utils.dataResponse(existingCurrency); 
        } catch (error) {
            console.log(error);
            throw new APIError('Erreur lors de la modification', error)
        }
    }

    static async getAllCurrency(){
        try {
            console.log("-------------| in Service |  ----------------- ");
            const currencies = await CurrencyRepository.findAll();
            return Utils.dataResponse(currencies);
        } catch (error) {
            console.log(error);
            throw new APIError('Données non trouvées', error)
        }
    }

    static async getCurrencyById({id}){
        try {
            const currency = await CurrencyRepository.findById({id});
            if (!currency) {
                throw new APIError('Device non trouvée')
            }
            return Utils.dataResponse(currency);
        } catch (error) {
            console.log(error);
            throw new APIError('Données non trouvées', error)
        }
    }

    static async getCurrencyByCode(inputCode ){
        try {
            console.log("-------------| in Service |  ----------------- ");
            const {code} = inputCode
            const currency = await CurrencyRepository.findByCode({code} );
            if (!currency) {
                throw new APIError('Device non trouvée')
            }
            return Utils.dataResponse(currency);
        } catch (error) {
            console.log(error);
            throw new APIError('Données non trouvées', error)
        }
    }

    static async deleteCurrencyById(inputId ){
        try {
            console.log("-------------| in Service |  ----------------- ");
            const {id} = inputId
            const currency = await CurrencyRepository.deleteById(id);
            if (!currency) {
                throw new APIError('Device non trouvée')
            }
            return Utils.dataResponse(currency);
        } catch (error) {
            console.log(error);
            throw new APIError('Impossible de supprimer la donnée', error)
        }
    }


}

module.exports = CurrencyService
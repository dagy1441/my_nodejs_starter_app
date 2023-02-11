const CurrencyService = require("../../services");

class CurrencyController {
  constructor() {}

  static async createCurrency(currency) {
    console.log(currency);
    try {
        console.log("------------- in controller ----------------- ", currency);

      currency = await CurrencyService.createCurrency(currency);

      return Promise.resolve({
        status: 200,
        error: false,
        message: "Dévise crée avec succès",
        data: currency,
      });
    } catch (error) {
      console.log(error.message);
      return Promise.resolve({
        status: 500,
        error: true,
        message: "une erreur interne s'est produite lors de la création",
        data: null,
      });
    }
  }

  static async updateCurrency(currency) {
    console.log(currency);
    try {
      currency = await CurrencyService.updateCurrency(currency);
      return Promise.resolve({
        status: 200,
        error: false,
        message: "Devise modifiée avec succès",
        data: currency,
      });
    } catch (error) {
      console.log(error.message);
      return Promise.resolve({
        status: 500,
        error: true,
        message: "une erreur interne s'est produite lors de la modification",
        data: null,
      });
    }
  }

  static async getAllCurrency() {
    try {
      console.log("------------- in controller ----------------- ");

      const currencies = await CurrencyService.getAllCurrency();
      console.log(currencies);
      return Promise.resolve({
        status: 200,
        error: false,
        message: "Liste des devises recupérées avec succès",
        data: currencies,
      });
    } catch (error) {
      return Promise.resolve({
        status: 500,
        error: true,
        message: "une erreur interne s'est produite lors de la création",
        data: null,
      });
    }
  }

  static async getCurrencyById({ id }) {
    try {
      console.log("------------- in controller ----------------- ");

      const currencies = await CurrencyService.getCurrencyById({ id });
   
      console.log(currencies);
      return Promise.resolve({
        status: 200,
        error: false,
        message: "Device recupérée avec succès",
        data: currencies,
      });
    } catch (error) {
      return Promise.reject({
        status: 500,
        error: true,
        message: "une erreur interne s'est produite lors de la recupération",
        data: null,
      });
    }
  }

  static async getCurrencyByCode( code ) {
    try {
      console.log("------------- in controller ----------------- ");
      const currencies = await CurrencyService.getCurrencyByCode( code );
      console.log(currencies);
      return Promise.resolve({
        status: 200,
        error: false,
        message: "Device recupérée avec succès",
        data: currencies,
      });
    } catch (error) {
      return Promise.resolve({ 
        status: 500,
        error: true,
        message: "une erreur interne s'est produite lors de la recupération",
        data: null,
      });
    }
  }

  static async deleteCurrencyById( id ) {
    try {
      console.log("------------- in controller ----------------- ");
      const currencies = await CurrencyService.deleteCurrencyById( id );
      console.log(currencies);
      return Promise.resolve({
        status: 200,
        error: false,
        message: "Device supprimée avec succès",
        data: currencies,
      });
    } catch (error) {
      return Promise.resolve({ 
        status: 500,
        error: true,
        message: "une erreur interne s'est produite lors de la suppression",
        data: null,
      });
    }
  }



}
module.exports = CurrencyController;

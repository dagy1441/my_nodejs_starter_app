const { APIError, STATUS_CODES } = require("../../../utils/app-errors");
const CurrencyModel = require("../models/currency.model");

class CurrencyRepository {
  
  static async createCurrency({ code, label }) {
    try {
      const currency = new CurrencyModel({
        code,
        label,
      });
      const currencyResult = await currency.save(currency);
      return currencyResult;
    } catch (error) {
      console.log(error.message);
      throw APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible de créer la devise"
      );
    }
  }

  static async save(currency) {
    try {
      // const currency = new CurrencyModel();
      const currencyResult = await CurrencyModel().save(currency);
      return currencyResult;
    } catch (error) {
      console.log(error);
      throw APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible de créer la devise"
      );
    }
  }

  static async update(id, currency) {
    try {
      // const currency = new CurrencyModel();
      let expectedCurrency = await CurrencyModel.findById(id);
      let updatedCurrency = Object.assign(expectedCurrency, currency)
      await updatedCurrency.save();
      return updatedCurrency;
    } catch (error) {
      console.log(error.message);
      throw APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible de modifier la devise"
      );
    }
  }

  static async findOneAndUpdate({id,code, label}) {
    try {
      let updatedCurrency = await CurrencyModel.updateOne({_id:id}, { code:code, label:label})
      await updatedCurrency.save();
      return updatedCurrency
    } catch (error) {
      console.log(error);
      throw new APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible de modifier la devise"
      );
    }
  }

  static async updateCurrency({ code, label }) {
    try {
      const currency = new CurrencyModel({ code, label });
      currency.save(currency);
         console.log("----------||-------", currency);
    } catch (error) {
      console.log(error.message);
      throw APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible de modifier la devise"
      );
    }
  }

  static async findAll() {
    try {
      console.log("-------------| in repository |  ----------------- ");
      return await CurrencyModel.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible d'obtenir la liste des devises"
      );
    }
  }

  static async findById({ id }) {
    try {
      return await CurrencyModel.findById(id);
    } catch (err) {
      console.log(err);
      throw new APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible d'obtenir la devise"
      );
    }
  }

  static async findByCode({ code }) {
    try {
      const currencies = await CurrencyModel.findOne({ code: code });
      return currencies;
    } catch (err) {
      console.log(err);
      throw new APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible d'obtenir la devise"
      );
    }
  }

  static async deleteById(id) {
    try {
      return await CurrencyModel.findByIdAndRemove(id);
    } catch (err) {
      console.log(err.message);
      throw APIError(
        "Erreur de base de données",
        STATUS_CODES.INTERNAL_ERROR,
        "Impossible de supprimer la devise"
      );
    }
  }
}

module.exports = CurrencyRepository;

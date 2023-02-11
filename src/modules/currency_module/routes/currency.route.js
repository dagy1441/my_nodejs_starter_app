const { Router } = require("../../../routes");
const { Utils } = require("../../../utils");
const CurrencyController = require("../http/controllers");
const { Validator } = require("../http/middleware");
const CurrencyData = require("../http/middleware/currency-data.middleware");

class CurrencyRoute extends Router {
  constructor(app) {
    super(app);
  }

  getRoutes() {
    this.app.post(
      "/currencies/create",
      CurrencyData.create(),
      Validator.validate,
      CurrencyData.checkExistCode,
      CurrencyData.checkExistLabel,
      async (req, res) => {
        const currency = req.body;
        const request = await CurrencyController.createCurrency(currency);
        return Utils.apiResponse(res, request);
      }
    );



    this.app.put(
        "/currencies/update",
        CurrencyData.update(),
        Validator.validate, 
        CurrencyData.checkExistCode,
        CurrencyData.checkExistLabel,
        async (req, res) => {
          const currency = req.body;
          const request = await CurrencyController.updateCurrency(currency);
          return Utils.apiResponse(res, request);
        }
      );

    this.app.get(
      "/currencies/get-all", 
      async (req, res) => {
      const currencies = await CurrencyController.getAllCurrency();
      return Utils.apiResponse(res, currencies);
    });

    this.app.get(
      "/currencies/get-by-id/:_id", 
      CurrencyData.checkExistId,
      async (req, res) => {
      const id = req.params;
      const currency = await CurrencyController.getCurrencyById({ id });
      return Utils.apiResponse(res, currency);
    });

    this.app.get("/currencies/get-by-code/:code", async (req, res) => {
      const code = req.params;
      console.log('code ' , code);
      const currency = await CurrencyController.getCurrencyByCode( code );
      console.log(currency);
      return Utils.apiResponse(res, currency);
    });

    this.app.delete("/currencies/delete-by-id/:id", async (req, res) => {
        const id = req.params;
        console.log('id ' , id);
        const currency = await CurrencyController.deleteCurrencyById( id );
        console.log(currency);
        return Utils.apiResponse(res, currency);
      });
    } 


  } 



module.exports = CurrencyRoute;

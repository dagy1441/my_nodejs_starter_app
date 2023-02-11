const { body } = require('express-validator');
const Utils = require('../../../../utils/utils');
const { CurrencyModel } = require('../../models');
class CurrencyData{
    
    static create(){
        return[
            body('code').not().isEmpty().withMessage('veuillez entrer un code'),
            body('label').not().isEmpty().withMessage('veuillez entrer un label')
        ]
    }

    static update(){
      return[
          body('id').not().isEmpty().withMessage('veuillez entrer un id'),
          body('code').not().isEmpty().withMessage('veuillez entrer un code'),
          body('label').not().isEmpty().withMessage('veuillez entrer un label')
      ]
  }

    static async checkExistCode(req, res, next){
        let code = req.body.code
        let existCurrency = await CurrencyModel.findOne({code: code})
        if(existCurrency){
            let errors = [
                {
                  "msg": "Ce code est déja utilisé",
                  "param": "code",
                  "location": "body"
                }
              ]
            return Utils.apiResponse(res, Promise.resolve({
                    status: 422,
                    message: errors[0].msg,
                    data: errors,
                }));
        }
        next()
    }

    static async checkExistLabel(req, res, next){
        let label = req.body.label
        let existLabel = await CurrencyModel.findOne({label: label})
        if(existLabel){
            let errors = [
                {
                  "msg": "Ce libellé est déja utilisé",
                  "param": "label",
                  "location": "body"
                }
              ]
            return Utils.apiResponse(res, Promise.resolve({
                    status: 422,
                    message: errors[0].msg,
                    data: errors,
                }));
        }
        next()
    }

    static async checkExistId(req, res, next){
      let id = req.params.id
      console.log(id);
      let existLabel = await CurrencyModel.findOne({_id: id})
      console.log(existLabel);
      if(!existLabel){
          let errors = [
              {
                "msg": "Device non trouvée verifier l'id",
                "param": "id",
                "location": "body"
              }
            ]
          return Utils.apiResponse(res, Promise.resolve({
                  status: 422,
                  message: errors[0].msg,
                  data: errors,
              }));
      }
      next()
  }

}
module.exports = CurrencyData
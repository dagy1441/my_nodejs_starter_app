const { body } = require('express-validator');
const Utils = require('../../../../utils/utils');
const { ValidateSignature } = require('../../../../utils/utils');
const { CustomerModel } = require('../../models');
class CustomerData{
    
    static register(){
        return[
            body('pseudo').not().isEmpty().withMessage('veuillez entrer un pseudo'),
            body('email').isEmail().withMessage('veuillez entrer un email'),
            body('password').isLength({min: 4}).withMessage('votre mot de passe doit faire au moins 4 caractère'),
            body('password').isLength({max: 10}).withMessage('votre mot de passe doit faire au plus 10 caractère'),
            body('password').not().isEmpty().withMessage('veuillez entrer un password'),
            body('confirmPassword').custom((value, { req }) => {
                return (value !== req.body.password)? false: true
            }).withMessage('les mots depasses ne correspondent pas'),
            body('email').custom((value, { req }) => {

                return (value !== req.body.password)? false: true
            }).withMessage('les mots depasses ne correspondent pas')
        ]
    }
    static async checkExistEmail(req, res, next){
        let email = req.body.email
        let existAdmin = await CustomerModel.findOne({email: email})
        if(existAdmin){
            let errors = [
                {
                  "msg": "Email déja utilisé",
                  "param": "email",
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

    static async checkExistPhone(req, res, next){
        let email = req.body.email
        let existAdmin = await CustomerModel.findOne({phone: phone})
        if(existAdmin){
            let errors = [
                {
                  "msg": "Ce numéro de téléphone est déja utilisé",
                  "param": "phone",
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

    checkDuplicateUsernameOrEmail = (req, res, next) => {
        // Username
        User.findOne({
          username: req.body.username
        }).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
      
          if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
          }
      
          // Email
          User.findOne({
            email: req.body.email
          }).exec((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
      
            if (user) {
              res.status(400).send({ message: "Failed! Email is already in use!" });
              return;
            }
      
            next();
          });
        });
      };

      checkRolesExisted = (req, res, next) => {
        if (req.body.roles) {
          for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
              res.status(400).send({
                message: `Failed! Role ${req.body.roles[i]} does not exist!`
              });
              return;
            }
          }
        }
        next();
      };

}
module.exports = CustomerData
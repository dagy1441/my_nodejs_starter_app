const { body } = require('express-validator');
class UserData{
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
       mongohelper.save({pseudo, password,email})
    }
}
module.exports = UserData
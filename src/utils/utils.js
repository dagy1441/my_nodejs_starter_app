const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../core/config/config");

class Utils {
  static async apiResponse(res, promise) {
    try {
      const response = await promise;
      const { error, message, data, status } = response;
      return res.status(status).json({ error, message, data });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        error: true,
        message: "une erreur interne s'est produite",
        data: null,
      });
    }
  }

  static async generateSalt() {
    return await bcrypt.genSalt();
  }

  static async generatePassword(password, salt) {
    return await bcrypt.hash(password, salt);
  }

  static async validatePassword(enteredPassword, savedPassword, salt) {
    return (
      (await this.GeneratePassword(enteredPassword, salt)) === savedPassword
    );
  }

  static async generateSignature(payload) {
    return await jwt.sign(payload, config.jwt_secret_key, { expiresIn: "1d" });
  }

  static async validateSignature(req) {
    const signature = req.get("Authorization");
    console.log(signature);

    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
      req.user = payload;
      return true;
    }

    return false;
  }

  static async isAuth(req, res, next) {
    const isAuthorized = await this.validateSignature(req);

    if (isAuthorized) {
      return next();
    }
    return res.status(403).json({ message: "Not Authorized" });
  }

  static dataResponse(data) {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  }


  static getString(){
    
  }

}

// // Log to console
// function dateDiff(date1, date2){
//     var diff = {}                           // Initialisation du retour
//     var tmp = date2 - date1;

//     tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
//     diff.sec = tmp % 60;                    // Extraction du nombre de secondes

//     tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
//     diff.min = tmp % 60;                    // Extraction du nombre de minutes

//     tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
//     diff.hour = tmp % 24;                   // Extraction du nombre d'heures

//     tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
//     diff.day = tmp;

//     return diff;
// }

// date1 = new Date('2012-07-20 00:00:00');
// date2 = new Date('2012-10-29 22:16:57');
// diff = dateDiff(date1, date2);
// alert("Entre le "+date1.toString()+" et "+date2.toString()+" il y a "+diff.day+" jours, "+diff.hour+" heures, "+diff.min+" minutes et "+diff.sec+" secondes");

module.exports = Utils;

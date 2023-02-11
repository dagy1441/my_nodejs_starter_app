const {UserModel} =  require('../../model')
class UserController{
    
    static register(){
        let newUser = new UserModel({login: "test", password:"testpass"})
         newUser.save()
        return Promise.resolve({status: 200, error: false, message: "User crée avec succès", data: newUser})
    }

    static updateUser(data){
        return new Promise((resolve, reject)=>{
            try{
                let newUser =  new UserModel(data)

                return resolve(newUser)
            }catch(e){
                reject (e)
            }
        })
    }

    
}
module.exports = UserController;





module.exports = {
    post:{
        tags:['USER CRUD operations'],
        description: "Create user",
        operationId: "createUser",
        parameters:[],
        requestBody: {
            content:{
                'application/json': {
                    schema:{
                        $ref:'#/services/user_service/model/UserModel' 
                    }
                }
            }
        },
        responses:{
            '201':{
                description: "Todo created successfully"
            },
            '500':{
                description: 'Server error'
            }
        }
    }
}
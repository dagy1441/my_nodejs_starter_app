require('dotenv').config()
const envVariable = process.env
const config = {
    serverurl: (envVariable.ENV === "prod")? envVariable.SERVER_HOST_PROD :envVariable.SERVER_HOST_DEV,
    serverport: (envVariable.ENV === "prod")? envVariable.SERVER_PORT_PROD :envVariable.SERVER_PORT_DEV,
    dburl: (envVariable.ENV === "prod")? envVariable.DB_URL_PROD :envVariable.DB_URL_DEV,
    dbname:(envVariable.ENV === "prod")? envVariable.DB_NAME_PROD :envVariable.DB_NAME_DEV,
    dbport:(envVariable.ENV === "prod")? envVariable.DB_PORT_PROD :envVariable.DB_PORT_DEV,
    appName: envVariable.API_NAME,
    jwt_secret_key: envVariable.JWT_SECRET_KEY,

}
module.exports = config 
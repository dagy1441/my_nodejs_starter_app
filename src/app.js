const {Server} = require('./core')
// const {CustomerRoutes} = require('./services/customer_service/routes')
// const {UserRoutes} = require('./services/user_service/routes')
require('./core/config/config')
const server = new Server
server.handle400()
      // .setRoutes(UserRoutes)
      // .setRoutes(CustomerRoutes)
      .setRoutes(CurrencyRoute)
      .handle404()
      .startServer()
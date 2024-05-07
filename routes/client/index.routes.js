const homeRoutes = require("./home.routes")
const dashboardRoutes = require("./dashboard.routes")
const callRoutes = require("./call.routes")
const registerRoutes = require("./register.routes")
const authenRoutes = require("./authen.routes")

module.exports = (app) =>{
    app.use("/",homeRoutes)
    app.use("/authen",authenRoutes)
    app.use("/dashboard",dashboardRoutes)
    app.use("/call",callRoutes)
    app.use("/register",registerRoutes)
}

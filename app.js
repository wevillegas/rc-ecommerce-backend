// llamo a la libreria express, esta libreria nos hace mas facil el conectarnos a la bd y levantar el servidor
var express = require("express")
// las funcionalidades de express quedan asignadas a app
var app = express()
// requiero el controlador definido en user.routes
var user_routes = require("./routes/user.routes")



// Fuincion para poder leer los valores enviados en metodos post mediante el body
app.use(express.json())
// permite que me lleguen los datos de postman
app.use(express.urlencoded({extended: true}))

// le decimos a app que va a utilizar por defecto el endpoint /api y despues se buscarán las rutas que se encuentran en las variables que se encuentran dentro
app.use(`/api`, [
    user_routes
])

// exporto la variable app al index 
module.exports = app
// llamo a la libreria express, esta libreria nos hace mas facil el conectarnos a la bd y levantar el servidor
var express = require("express")
// las funcionalidades de express quedan asignadas a app
var app = express()
// requiero el controlador definido en user.controler
var UserController = require("./controllers/user.controller")



// Fuincion para poder leer los valores enviados en metodos post mediante el body
app.use(express.json())
// permite que me lleguen los datos de postman
app.use(express.urlencoded({extended: true}))



// llamo a una ruta que se llama /, entonces si pongo en el buscador el puerto 3000 y la ruta / (habiendo iniciado el servidor) devuelvo a traves de express (que esta escuchando la peticion) Express escucha tal endpoint y cuando lo llamo ejecuta una funcion, esa funcion prepara algo, me lo devuelve, y en el frontend empiezo a trabajarlo. Acá elaboro rutas y le hago peticiones a distintos endpoint

// en este caso llamo a la variable userController la cual tiene dentro un metodo, el cual en este caso es una funcion, que se llama adduser. Cuando mi servidor escucha que alguien le pega a ese endpoint (/api/user) ejecuta toda la logica que esta en el metodo addUser

// el metodo post me permite asignar a la peticon una propiedad llamada body, body será un objeto y le insertaré todos que quiero que reciba
app.post('/api/user', UserController.addUser)

// hago la peticion get para poder traerme a los usuarios
app.get(`/api/user`, UserController.getUsers)


// exporto la variable app al index 
module.exports = app
// llamo a la libreria express, esta libreria nos hace mas facil el conectarnos a la bd y levantar el servidor
var express = require("express")
// traemos la funcion router de express y queda asignada a api
var api = express.Router()
// requiero el controlador definido en user.controler
var UserController = require("../controllers/user.controller")


// llamo a una ruta que se llama /, entonces si pongo en el buscador el puerto 3000 y la ruta / (habiendo iniciado el servidor) devuelvo a traves de express (que esta escuchando la peticion) Express escucha tal endpoint y cuando lo llamo ejecuta una funcion, esa funcion prepara algo, me lo devuelve, y en el frontend empiezo a trabajarlo. Acá elaboro rutas y le hago peticiones a distintos endpoint
// en este caso llamo a la variable userController la cual tiene dentro un metodo, el cual en este caso es una funcion, que se llama adduser. Cuando mi servidor escucha que alguien le pega a ese endpoint (/api/user) ejecuta toda la logica que esta en el metodo addUser
// el metodo post me permite asignar a la peticon una propiedad llamada body, body será un objeto y le insertaré todos que quiero que reciba
api.post('/user', UserController.addUser)

// hago la peticion get para poder traerme a todos los usuarios
api.get(`/users`, UserController.getUsers)

// traerse informacion especifica, query params
// llamo al endpoint api/user, tambien le mando una data (ya que quiero traerme un usuario en particualr) esa data va a ir como un query param, en el que ese query param tiene una key y un valor asociados. En la URL aparecerá un ? que significa que todo lo que esta adelante de el son parametros nombrados. Cuando esto se realice, se ejecuta la funcion getUser. Mandamos en la URL un ID y luego haremos una busqueda puntualmente de ese ID
api.get(`/user/`, UserController.getUser)

// ruta para eliminar usuario
api.delete("/user/", UserController.deleteUser)

// ruta para editar usuarios
api.put('/user/:upd_id', UserController.updateUser);

// ruta para logearse
api.post('/login', UserController.login);

module.exports = api


// opcion 2 para traerse informacion especifica 
// lo que se hace para buscar una informacion puntual lo que hago es enviar un dato, los dos puntitos significan un parametro. En este caso le estoy diciendo a la url que va a recibir un user_id. El segundo parametro no siempre lo voy a mandar, entonces puedo decir que ese mismo sea opcional (?). Cda vez que ponga esta URL, se ejecutara la funcion asociada. Esto tiene una desventaja, y es que los parametros pueden ir desordenados y puede mezclar key con valores que no le corresponden
// api.get(`/api/user/:user_id/:active?`, UserController.getUser)

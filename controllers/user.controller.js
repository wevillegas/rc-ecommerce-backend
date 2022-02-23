// en este archivo voy a manejar el CRUD (create, read, update and delete) del usuario

// requerimos el esquema creado en el archivo user.schema
const userSchema = require("../schemas/user.schema")
var User = require("../schemas/user.schema")

// creo una function la cual se encargará de agregar usuarios
// el parametro res tiene asosiados eventos para realizar una respuesta, el rep tiene todo lo asociado a la peticion que se esta haciendo 
function addUser(req, res){
    // creo la variable newUser, en la cual creare los usuarios en base al schema (las propiedades del objeto que mande desde postman deben ser las mismas que las del schema, sino no me crea el objeto)
    let newUser = new User(req.body)

    //otra forma de hacer lo anterior
    // newUser.fullName = req.body.fullName
    // newUser.email = req.body.email
    // newUser.password = req.body.password
    
    // guardo el nuevo usuario
    newUser.save()
    
    // envio como respuesta a los nuevos usuarios creados, estos seran exportados al archivo app.js
    res.send({ usuarioNuevo: newUser})
}

// creo una funcion asincrona en la cual me traeré a los usuarios creados
async function getUsers(req, res) {
    // me traigo todo lo que haya en la coleccion users, espero que esta accion se cumpla para que se siga leyendo el resto del codigo
    const usuariosDB = await User.find() // users
    // devuelvo los usuarios traidos (todo lo que econtró en la coleccion users de mi base de datos)
    res.send({ users: usuariosDB })
}


// exporto las funciones como un objeto, ya que vamos a meter muchos elementos en ellas
module.exports = {
    addUser,
    getUsers
}
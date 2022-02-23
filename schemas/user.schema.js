// requiero mongoose
var mongoose = require("mongoose")

// defino la variable schema, la cual a traves de mongoose se llama a Schema, que es una clase, dentro de esta variable vamos a almacenar todas las funciones que tiene es clase
var Schema = mongoose.Schema

// creo el esquema el cual tendra la informacion que se pedirá para la creacion de los usuarios
var UserSchema = new Schema({
    // no hace falta especificar el id, mongoose lo hace automaticamente

    fullName: { type: String },
    email: { type: String },
    password: { type: String }

})

// exporto el esquema, lo transformo en modelo. El "User" es el nombre con el que se va a guardar en la base de datos, se le agrega una s al final automaticamente
module.exports = mongoose.model("User", UserSchema)
// requiero mongoose
var mongoose = require("mongoose")

// defino la variable schema, la cual a traves de mongoose se llama a Schema, que es una clase, dentro de esta variable vamos a almacenar todas las funciones que tiene es clase
var Schema = mongoose.Schema

var rolesValidos = [
    "ADMIN_ROLE",
    "USER_ROLE", // personal interno de la empresa
    "CLIENT_ROLE" // clientes usuarios de mi app
]

// creo el esquema el cual tendra la informacion que se pedirá para la creacion de los usuarios
var UserSchema = new Schema({
    // no hace falta especificar el id, mongoose lo hace automaticamente
    // las llaves son para definir varias propiedades
    fullName: { type: String, required: true, maxlength: 40 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    phone: {type: String, maxlength: 14},
    password: { type: String, required: true, },
    adress: {
        street: {type: String},
        number: {type: Number},
    },
    active: {type: Boolean, default: false},
    role: { type: String, required: true, default: "USER_ROLE", enum: rolesValidos}, // el enum hace que se base en la variable definida antes, si lo que se manda no esat en esa variable, da error.
    requerido: {type: String, required: true}

})

// exporto el esquema, lo transformo en modelo. El "User" es el nombre con el que se va a guardar en la base de datos, se le agrega una s al final automaticamente
module.exports = mongoose.model("User", UserSchema)
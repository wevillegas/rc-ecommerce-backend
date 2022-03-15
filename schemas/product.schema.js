// requiero mongoose
var mongoose = require("mongoose")

// defino la variable schema, la cual a traves de mongoose se llama a Schema, que es una clase, dentro de esta variable vamos a almacenar todas las funciones que tiene es clase
var Schema = mongoose.Schema

var Categories = [
    'VERDURAS',
    'FRUTAS',
    'CARNES',
    'LACTEOS',
    'SNACKS',
    'BEBIDAS',
    'GRANEL',
    'LIMPIEZA',
    'PERFUMERIA',
    'GENERAL',
];
var ivaOptions = [
    21,
    10.5,
    0,
];


// creo el esquema el cual tendra la informacion que se pedirá para la creacion de los productos
var UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 200
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Boolean,
        required: false
    },
    category_id: {
        type: String,
        required: true,
        default: 'GENERAL',
        enum: Categories,
    },
    cod: {
        type: String,
        // ref: 'codigo',
        maxlength: 4,
        minlength: 4
    },
    iva: {
        type: String,
        required: true,
        default: 21,
        enum: ivaOptions,
    },
    // propiedad que nos indica cuando fue creado el producto
    createdAt: { type: Date, required: true, default: Date.now },
    // propiedad que nos indica cuando se actualizó el producto
    updatedAt: { type: Date },
    clientId: { type: String, ref: 'User', required: true }

})

// exporto el esquema, lo transformo en modelo. El "Products" es el nombre con el que se va a guardar en la base de datos, se le agrega una s al final automaticamente
module.exports = mongoose.model("Product", UserSchema)
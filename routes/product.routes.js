// llamo a la libreria express, esta libreria nos hace mas facil el conectarnos a la bd y levantar el servidor
var express = require('express');
// traemos la funcion router de express y queda asignada a api
var api = express.Router();
// requiero el controlador definido en product.controler
var productController = require('../controllers/product.controller');

// ruta para agregar producto
api.post('/product', productController.addProduct);
// ruta para obtener todos los productos
api.get('/products', productController.getProducts);
// ruta para obtener un producto en especifico
api.get('/product', productController.getProduct);
// ruta para borrar un producto
api.delete('/product/', productController.deleteProduct);
// ruta para actualizare un producto 
api.put('/product/:upd_id', productController.updateProduct);


module.exports = api;
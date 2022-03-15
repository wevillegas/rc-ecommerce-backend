// llamo a la libreria express
var express = require("express")
// las funcionalidades de express quedan asignadas a app
var app = express()

// tengo al servidor de express escuchando en el púerto 3000
app.listen(3000, ()=>{
    console.log("el servidor esta corriendo")
})

// llamo a una ruta que se llama hello, entonces si pongo en el buscador el puerto 3000 y la ruta hello (habiendo iniciado el servidor) devuelvo a traves de express (que esta escuchando la peticion) devuelvo la respuesta "hello world". Express escucha tal endpoint, ese endpoint (/hello) cuando lo llamo ejecuta una funcion, esa funcion prepara algo, me lo devuelve, y en el frontend empiezo a trabajarlo
app.get('/hello', function(req, res) {
    res.send('hello world');
});
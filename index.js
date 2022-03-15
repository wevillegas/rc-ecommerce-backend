// importo la variable app del archivo app.js
var app = require("./app")
// creo variable con el puerto
var port = 3000
// creo constante con la contraseña de mongo para asi poder conectarme a la base de datos
const password = `wenguadaclari`
// creo una variable con el link de mi base de datos
var URL = `mongodb+srv://wevillegas:${password}@cluster0.nu5sa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// llamo a la libreria mongoose (la cual sirve para conectarme a la base de datos) casi siempre se usa en proyectos con mongo. Esta variable ahora tiene todos los metodos que la libreria tiene
var mongoose = require(`mongoose`)

// llamo a una funcion asincrona la cual hará que me conecte a la base de datos
async function connect (){
    // si la promesa se resuelve correctamente, entro al try
    try{
        // me conecto a la base de datos a traves de mongoose, uso el await para que el codigo espere a que me conecte para seguir leyendo lo de abajo. Cada vez que me dice que un metodo devuelve una promesa, tengo que usar el awair o el then. Lo primero a hacer es conectarme a la base de datos, yo manteniendo esa conexion en algun punto puedo pedirle que me mande, escriba o haga algo que yo le pida.
        await mongoose.connect(URL)
        // si la promesa se resuelve correctamente, se lee lo siguiente (en este caso el console log)
        console.log("\x1b[36m Conectado a MONGODB \x1b[37m")
        // luego de esperar la conexion al la base de datos pongo al servidor (express) a escuchar, si esto se escucha correctamente mando el mensaje de abajo (el console log). Lo que hacemos acá es: Levantamos el servidor express para que escuche esas peticiones que quiero hacer, ya quee todas peticiones en algun momento van a tener una funcion asociada, que sera ir a buscar alguna data a la base de datos y traermela filtrada con lo que yo le estoy pidiendo desde el front
        app.listen(port, () => console.log(`server escuchando en el puerto ${port}`))
    }
    // si la promesa NO se resuelve correctamente, entro al catch
    catch(err){
        console.log('\x1b[31m Error al conectar con MongoDB \x1b[37m');
    }
}


connect()









// // tengo al servidor de express escuchando en el púerto 3000
// app.listen(port, ()=>{
//     console.log("el servidor esta corriendo")
// })

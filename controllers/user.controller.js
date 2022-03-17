// en este archivo voy a manejar el CRUD (create, read, update and delete) del usuario
const User = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../config/config').secret
const salt = 10;


// creo una function la cual se encargará de agregar usuarios
// el parametro res tiene asosiados eventos para realizar una respuesta, el rep tiene todo lo asociado a la peticion que se esta haciendo 
async function addUser(req, res) {
    // creo la variable newUser, en la cual creare los usuarios en base al schema (las propiedades del objeto que mande desde postman deben ser las mismas que las del schema, sino no me crea el objeto)
    try {
        console.log(req.body)

        if (!req.body.password || !req.body.fullName || !req.body.email) {
            return res.status(400).send({error:'Falta un campo obligatorio'})
        }
        // reasigno el valor de passwprd con el hash generado a partir del password original
        req.body.password = await bcrypt.hash(req.body.password, salt);
    // genero un nuevo usuario en base al esquema de usuarios
    let newUser = new User(req.body);
    // guardo el nuevo usuario
    await newUser.save()
    // envio como respuesta a los nuevos usuarios creados, estos seran exportados al archivo app.js
    res.send({usuarioNuevo : newUser})
} catch(error){
        res.status(404).send(error)

    }

    //otra forma de hacer lo anterior
    // newUser.fullName = req.body.fullName
    // newUser.email = req.body.email
    // newUser.password = req.body.password
}



// creo una funcion asincrona en la cual me traeré a los usuarios creados
async function getUsers(req, res) {
    // me traigo todo lo que haya en la coleccion users, espero que esta accion se cumpla para que se siga leyendo el resto del codigo
    const usuariosDB = await User.find()
    // devuelvo los usuarios traidos (todo lo que econtró en la coleccion users de mi base de datos)
    res.send({
        users: usuariosDB
    })
}



// creo una funcion para pedir los datos de UN usuario
async function getUser(req, res) {
    // lo que me llegue con ese query (user_id) lo voy a guardar en la variable userID. Accedo a request, a query y a la propiedad especificada. Este será el ID que recibimos como query param desde el endpoint
    const userId = req.query.user_id;
    // hago la busqueda del usuario por el id con el metodo definido en user, Se busca especificamente ese id en nuestra coleccion users, el usuario encontrado será guardado en la variable. Pongo el await para que el codigo espere a que se reciba la informacion.
    const user = await User.findById(userId);
    // si NO encuentra el usuario, envio este mensaje junto al estado de error 404
    if (!user) return res.status(404).send('No se encuntro el usuario que busca')
    // envio el usuario encontrado junto al estado de 200
    return res.status(200).send({
        user: user
    });
}

// funcion para eliminar usuario
async function deleteUser(req, res) {
    const UserIdDelete = req.query.user_id_delete;
    const userDelete = await User.findByIdAndDelete(UserIdDelete);
    if (!userDelete) return res.status(404).send('No se encuntro el usuario que desea borrar')

    return res.status(200).send(`El usuario ${userDelete.email} ha sido borrado correctamente`);
}

// funcion para editar usuarios
async function updateUser(req, res) {
    const id = req.params.upd_id;
    const userChangesToApply = req.body;
    const updatedUser = await user.findByIdAndUpdate(id, userChangesToApply, {
        new: true});
    if (!updatedUser) return res.status(404).send('No se encuntro el usuario que desea modificar');
    return res.status(200).send(updatedUser);

}

async function login(req, res){
    try{
        // recibo el mail del usuario del body, el body encapsula la informacion para que vaya mas cuidada. Es necesario llamar a traves del metodfo post para poder hacer uso de este body. El bosy es LO QUE VIENE
        const email = req.body.email;
        // recibo el password del usuario del body
        const password = req.body.password;
        // // corroboro que haya un usuario en la base de datos con el correo enviado. Si es así, guado ese usuario en la variable userDB
        const userDB = await User.findOne({email});
        // si el usuario no existe, envio este error y retorno
        if(!userDB) return res.status(404).send({msg:'El usuario no existe en nuestra base de datos'});
        // voy a chequear si la contraseña mandando coincide al hacer un compare con lo que obtuve del usuario que quiero logear (el que se guardo en userDB) si se realiza correctamente se guarda en la variable isValidPassword. La contraseña enviada desde el front sera comparada con la contraseña que quedó encriptada en el registro. Usa su logica para determinar si dica contraseña desnuda corresponde a lo encriptado
        const isValidPassword = await bcrypt.compare(password, userDB.password);
        // si los datos no coinciden, disparo un error y retorno
        if(!isValidPassword) return res.status(401).send({msg: 'Alguno de los datos no es correcto'});
        console.log(userDB)

        // saco el password despues del logeo por seguridad
        userDB.password = undefined;
        console.log(userDB)

        // Generamos un token de acceso
        const token = jwt.sign(userDB.toJSON(), secret, {expiresIn: "24h"})

        // envio una confirmacion de que el usuario se logeo correctamente
        return res.status(200).send({
            ok: true,
            msg:'Login correcto',
            user: userDB,
            token
        })
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}


module.exports = {
    addUser,
    getUsers,
    getUser,

    deleteUser,
    updateUser,
    login
}
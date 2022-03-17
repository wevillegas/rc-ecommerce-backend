const secret = require('../config/config').secret;
const jwt = require('jsonwebtoken');

// funcion para autenticar el inicio de sesion y la conexion del usuario
const checkAuthentication = (req, res, next)=> {
    // me traigo el token desde la parte authorization
    const token = req.headers.authorization;
    // verifico si traido coincide con el inicio de sesion
    jwt.verify(token, secret, (error, jwtDecoded)=> {
        // si no coinice, mando error
        if(error) return res.status(400).send({
            ok: false,
            msg: 'Error de token'
        })
        // si coincide, asigno el token al usuario
        req.user = jwtDecoded
        next();
    })
}

module.exports = checkAuthentication;

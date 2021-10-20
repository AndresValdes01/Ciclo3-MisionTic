'use strict'
const Usuario = require('../models/Usuario.model.js')

function getUsuarios(req, res){
    Usuario.find({}, (error, usuarios)=>{
        //En caso de que haya habido un error
        if(error) return res.status(500).send({
            message: `Error al realiza la consulta de los usuarios: ${error}`
        });

        //En caso que no haya usuarios
        if(!usuarios) return res.status(404).send({
            message: `No hay usuarios registrados`
        });

        //En caso que todo vaya bien
        res.status(200).send({ usuarios });
    })
}

function registrarUsuario(req, res){
    console.log('POST /api/usuario');
    console.log(req.body);

    //Primero buscamos el usuario en la base de datos
    Usuario.findOne({codigo: req.body.codigo}, (err, usuarioEnBaseDeDatos)=>{
        if(!usuarioEnBaseDeDatos){
            //Si no se encuentra el usuario, se guarda
            let usuarioTemp = {
                codigo: req.body.codigo,
                nombre : req.body.nombre,
                email: req.body.email,
                rol: req.body.rol,
                estado: req.body.estado
            }
        
            let usuarioARegistrar = new Usuario(usuarioTemp);
        
            usuarioARegistrar.save((error, usuarioRegistrado)=>{
                if(!error){
                    res.status(200).send({
                        message: 'Usuario registrado',
                        usuarioRegistrado
                    })
                }else{
                    res.status(500).send({
                        message: `Error al guardar nuevo usuario en la base de datos: ${err}`
                    });
                }
            })

            
        }else{
            //Si se encuentra el usuario sacamos un error
            res.status(202).send({
                message: `El usuario con codigo ${req.body.codigo} ya se encuentra registrado`
            })
        }
    });

}
function eliminarUsuario(req, res){
    console.log("el usuario ha sido eliminado")
}
function actualizarUsuario(req, res){
    Usuario.find({}, (error, usuarios)=>{})
    console.log("el usuario ha sido actualizado")
}


module.exports = {
    getUsuarios,
    registrarUsuario,
    eliminarUsuario,
    actualizarUsuario

}
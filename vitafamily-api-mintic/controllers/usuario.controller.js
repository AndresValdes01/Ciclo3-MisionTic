'use strict'
const Usuario = require('../models/Usuario.model.js')

function getUsuario(req, res){
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
    console.log( req .body );

    const dataUsuario = new Usuario( req .body );     //  Agrego la data al modelo
    const usuarioInsertado = dataUsuario .save();     //  Inserto la data a la base de datos

    if( ! usuarioInsertado ) return res.json({
        error: {
            mensaje: `No se pudo registrar`
        }
    });

    res.json({
        mensaje: `Se pudo registrar`,
        usuario: req .body
    });


    //Primero buscamos el producto en la abse de datos
    // Producto.findOne({id: req.body.id}, (err, productoEnBaseDeDatos)=>{
    //     if(!productoEnBaseDeDatos){
    //         //Si no se encuentra el producto, se guarda
    //         let productoTemp = {
    //             id: req.body.id,
    //             Descripcion: req.body.Descripcion,
    //             preciounidad: req.body.preciounidad,
    //             cantidad: req.body.cantidad,
    //             estado: req.body.estado,               
    //         }
        
    //         let productoARegistrar = new Producto(productoTemp);
        
    //         productoARegistrar.save((error, productoRegistrado)=>{
    //             if(!error){
    //                 res.status(200).send({
    //                     message: 'Producto registrado',
    //                     productoRegistrado
    //                 })
    //             }else{
    //                 res.status(500).send({
    //                     message: `Error al guardar nuevo producto en la base de datos: ${err}`
    //                 });
    //             }
    //         })

            
    //     }else{
    //         //Si se encuentra el producto sacamos un error
    //         res.status(202).send({
    //             message: `El producto con ID ${req.body.id} ya se encuentra registrado`
    //         })
    //     }
    // });

}

const getOnlyUsuario = async (req, res) => {
    try {                            
        Producto.findOne({_id: req.params.id}, (err, usuarioEnBaseDeDatos) => {            
            if (usuarioEnBaseDeDatos) {    
                // Si hay registros en la DB            
                res.status(200).send({ 
                    usuarioEnBaseDeDatos, 
                    message: `Busqueda ralizada Correctamente`
                });                
            } else {
                if (res.statusCode == 200) {
                    res.send({
                        message: `No hay usuario registradas con el ID ${ req.params.id }`
                    });
                }                  
            }
        });
    } catch (error) {
        res.status(500).send({
            message: `Error de conexion a la DB ${ err }, No se pudo Buscar usuario ${ error }`
        });
    }
}


const updateUsuario = async ( request, response ) => {

    const idUsuario = request .params .usuario_id;
    const usuarioActualizar = request .body;

    try {
        // Consulta si el usuario existe
        const usuarioEncontrado = await Usuario .find({ _id: idUsuario });

        // Verifico si NO ENCONTRO el producto
        if( ! usuarioEncontrado ) return response.json({
            error: {
                mensaje: `El usuario no se encuentra registrado`
            }
        });

        // Consulta para actualizar usuario
        const usuarioActualizado = await Usuario .findByIdAndUpdate({ _id: idUsuario }, usuarioActualizar, { new: true } );
        usuarioActualizado .save();            // Inserto cambios a la base de datos

        response .json({
            mensaje: `Usuario actualizado`,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log( `Se produjo un error` );
        response .json({
            error: {
                mensaje: `Se produjo un error`
            }
        });
    }

}

const deleteUsuario = async ( request, response ) => {
    const idUsuario = request .params .usuario_id;

    try {

        // Consulta si el usuario existe
        const usuarioEncontrado = await Usuario .findById( idUsuario );

        // Verifico si NO ENCONTRO el usuario
        if( ! usuarioEncontrado ) return response.json({
            error: {
                mensaje: `El usuario no se encuentra registrado`
            }
        });

        const usuarioEliminado = await Usuario .findByIdAndRemove( idUsuario );
        usuarioEliminado .save();              // Eliminar de la base de datos

        response .json({
            mensaje: `Elimino registro`
        });

    } catch (error) {
        console.log( `Se produjo un error` );
        response .json({
            error: {
                mensaje: `Se produjo un error`
            }
        });
    }

}

module.exports = {
    getUsuario,
    registrarUsuario,
    getOnlyUsuario,
    updateUsuario,
    deleteUsuario
}
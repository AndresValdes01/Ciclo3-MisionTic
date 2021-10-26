'use strict'
const express = require('express');
const api = express.Router();

const UsuarioCtrl = require('../controllers/usuario.controller');
const VentasCtrl = require('../controllers/ventas.controller');
const ProductosCtrl = require('../controllers/producto.controller');

api.get('/usuarios', UsuarioCtrl.getUsuarios);
api.post('/usuarios', UsuarioCtrl.registrarUsuario);
/* api.delete('/usuarios', UsuarioCtrl.eliminarUsuario); */
api.put('/usuarios', UsuarioCtrl.actualizarUsuario);


api.get('/gestionventas', VentasCtrl.getVentas);
api.get('/gestionventas/:id', VentasCtrl.getOnlySale);
api.get('/gestionventas/:key/:value', VentasCtrl.getManySales);
api.post('/gestionventas', VentasCtrl.registrarVenta);
api.put('/gestionventas', VentasCtrl.updateVenta);
api.delete('/gestionventas/:id', VentasCtrl.deleteVenta);

api.get('/productos', ProductosCtrl.getProducto);
api.post('/productos', ProductosCtrl.registrarProducto);
module.exports = api;
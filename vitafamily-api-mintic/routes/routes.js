'use strict'
const express = require('express');
const api = express.Router();

const UsuarioCtrl = require('../controllers/usuario.controller');
const VentasCtrl = require('../controllers/ventas.controller');
const ProductosCtrl = require('../controllers/producto.controller');

api.get('/usuarios', UsuarioCtrl.getUsuario);
api.post('/usuarios', UsuarioCtrl.registrarUsuario);

api .put( '/usuarios/:usuario_id', UsuarioCtrl .updateUsuario );
api .delete( '/usuarios/:usuario_id', UsuarioCtrl .deleteUsuario );

api.get('/gestionventas', VentasCtrl.getVentas);
api.get('/gestionventas/:id', VentasCtrl.getOnlySale);
api.get('/gestionventas/:key/:value', VentasCtrl.getManySales);
api.post('/gestionventas', VentasCtrl.registrarVenta);
api.put('/gestionventas', VentasCtrl.updateVenta);
api.delete('/gestionventas/:id', VentasCtrl.deleteVenta);

api.get('/productos', ProductosCtrl.getProducto);
api.post('/productos', ProductosCtrl.registrarProducto);

api.get('/productos/:id', ProductosCtrl.getOnlyProduct);
api.put( '/productos/:producto_id', ProductosCtrl .updateProducto );
api.delete( '/productos/:producto_id', ProductosCtrl .deleteProducto );

module.exports = api;
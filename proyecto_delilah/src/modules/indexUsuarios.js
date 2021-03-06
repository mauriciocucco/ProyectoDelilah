const express = require("express");
const usuario = express.Router();
const eliminarUsuario = require("../controllers/usuario/eliminarUsuario");
const crearUsuario = require("../controllers/usuario/crearUsuario");
const confirmarUsuario = require("../controllers/usuario/confirmarUsuario");
const loginUsuario = require("../controllers/usuario/loginUsuario");
const verificarUsuarioNuevo = require("../middlewares/usuario/verificarUsuarioNuevo");
const validarUsuario = require("../middlewares/usuario/validarUsuario");

//subrutas de /usuarios
usuario.post("/login", validarUsuario, loginUsuario);
usuario.post("/registro", verificarUsuarioNuevo, crearUsuario);
usuario.get("/confirm", confirmarUsuario);
usuario.put("/delete", eliminarUsuario); //borrado lógico

module.exports = usuario;

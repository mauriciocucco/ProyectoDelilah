const sequelize = require("../config/db");

const dishesNumber = (valoresNuevos) => sequelize.query(`INSERT INTO cantidad_platos (id_plato1, cantidad, id_pedido1) VALUES ${valoresNuevos}`, { type: sequelize.QueryTypes.INSERT });

module.exports = {
    dishesNumber
}
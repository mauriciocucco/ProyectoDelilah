const { newOrder } = require("../../models/pedido");
const { newDishesNumber } = require("../../models/cantidad_platos");
const { beginOrder, commitOrder, rollbackOrder} = require("../../services/transaction")

const subirPedido = async (req, res) => {

    try{

        const { id_usuario1, descripcion, tipo_pago, total } = req.pedido;

        const begin = await beginOrder(); //inicio la transacción

        const [id_pedido] = await newOrder([id_usuario1, tipo_pago, total]); //INSERT del pedido

        descripcion.forEach( element => element["id_pedido1"] = id_pedido); //le sumo el id del pedido

        for(let i=0; i< descripcion.length; i++) { //en un forEach tengo que usar async en el callback y usar otro try-catch dentro y un throw
        
            let insert = await newDishesNumber(Object.values(descripcion[i])); //INSERT en cantidad_platos

            console.log(insert); 
        };

        const commit = await commitOrder();

        res.status(200).send({mensaje: "Pedido subido con éxito", id_pedido});
        
    }catch (error) {

        console.log(error);

        const rollback = await rollbackOrder();
        
        res.status(500).send({error: "Error del servidor"});
    }
}

module.exports = subirPedido;
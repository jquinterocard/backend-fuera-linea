


exports.listarArticulos = async function (req, res) {

	const sql = `SELECT a.id,a.nombre,a.codigo,a.valor,a.id_impuesto,u.id as id_unidad_medida,u.nombre as unidad_medida,a.control_inventario,a.estado FROM pos_articulo a
				JOIN pos_unidad_medida u ON u.id = a.id_unidad_medida `;
	const { rows } = await db.query(sql);

	return res.status(200).send({
		status: 'success',
		articulos: rows
	});


}
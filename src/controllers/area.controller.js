const Area = require('../models/area.model');
const helpers = require('../helpers/helpers');


exports.getAll = async function (req, res) {
	const rows = await Area.findAll({
		attributes: ['_id', 'ts'],
		raw: true
	})

	return res.status(200).send({
		status: 'success',
		areas: rows
	})
}

exports.sincronizar = async function (req, res) {
	const { remove, update, get } = req.body;

	const response = {};


	const errors = [];
	if (remove) {
		const removed = [];
		for (let _id of remove) {
			await Area.destroy({
				where: { _id: _id }
			});
			removed.push(_id);
		}
		response.removed;
	}

	const gets = [];

	if (update) {
		const updated = [];
		for (let area of update) {
			if (area.ts > 0) {
				//Update
				const dbArea = await Area.findOne({
					where: {
						_id: area._id
					},
					raw: true,
					attributes: ['_id', 'codigo', 'nombre', 'requiere_comanda', 'estado', 'ts']
				});

				if (dbArea) {
					if (dbArea.ts > area.ts) {
						// Base de datos mas nueva que la version enviada por el cliente
						gets.push(dbArea);
					} else {

						area.dg_fecha_accion = helpers.getCurrentTimestamp();
						area.dg_accion = 'update';
						const _id = area._id;
						delete area._id;
						try {
							await Area.update(area, {
								where: { _id: _id }
							});
							area._id = _id;
							updated.push(area);

						} catch (ex) {
							console.log(ex);
							errors.push(area._id);
						}
					}
				} else {
					// insert
					area.dg_fecha_accion = helpers.getCurrentTimestamp();
					area.dg_accion = 'insert';
					area.ts = Date.now();
					try {
						await Area.create(area);
						updated.push(area);
					} catch (ex) {
						console.log(ex);
						errors.push(area._id);
					}
				}

			}
			else {

				// insert
				area.dg_fecha_accion = helpers.getCurrentTimestamp();
				area.dg_accion = 'insert';
				area.ts = Date.now();
				try {
					await Area.create(area);
					updated.push(area);
				} catch (ex) {
					console.log(ex);
					errors.push(area._id);
				}
			}
		}

		response.updated = updated;
	}

	if (get) {
		for (let _id of get) {
			const area = await Area.findOne({
				where: {
					_id: _id
				},
				raw: true,
				attributes: ['_id', 'codigo', 'nombre', 'requiere_comanda', 'estado', 'ts']
			});
			gets.push(area);
		}
	}

	if (gets.length > 0) {
		response.get = gets;
	}

	return res.status(200).send({
		status: 'success',
		response
	})
}







const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const withDateNoTz = require('sequelize-date-no-tz-postgres');

const DataTypes = withDateNoTz(Sequelize);

const Area = sequelize.define('sah_area', {

    codigo: {
        type: Sequelize.STRING,
        unique: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    requiere_comanda: {
        type: Sequelize.BOOLEAN
    },
    estado: {
        type: Sequelize.STRING
    },
    dg_fecha_accion: {
        type: DataTypes.DATE_NO_TZ
    },
    dg_accion: {
        type: Sequelize.STRING
    },
    _id: {
        type: Sequelize.STRING
    },
    ts: {
        type: Sequelize.BIGINT
    }

}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = Area;
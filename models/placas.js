const db = require('../config/config');

const Placa = {};

Placa.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        placa,
        eje,
        tipologia,
        CONVERT(id_aliado, char) AS id_aliado,
        CONVERT(inactivo, char) AS inactivo,
        created_at,
        updated_at
    FROM
        placas
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            result(null, data);
        }
    });
};

Placa.create = (placa, result) => {
    const sql = `
    INSERT INTO
        placas(
            placa,
            eje,
            tipologia,
            id_aliado,
            inactivo
        )
    VALUES(?, ?, ?, ?, ?)
    `;

    db.query(
        sql, [
            placa.placa,
            placa.eje,
            placa.tipologia,
            placa.idAliado,
            placa.inactivo
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nueva placa:', res.insertId);
                result(null, res.insertId);
            }
        }
    );
};

module.exports = Placa;
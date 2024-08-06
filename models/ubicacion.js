const db = require('../config/config');

const Ubicacion = {};

Ubicacion.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        nombre,
        lat,
        lng
    FROM
        ubicaciones
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

Ubicacion.create = (ubicacion, result) => {
    const sql = `
    INSERT INTO
        ubicaciones(
            nombre,
            lat,
            lng
        )
    VALUES(?, ?, ?)
    `;

    db.query(
        sql, [
            ubicacion.nombre,
            ubicacion.lat,
            ubicacion.lng
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nueva ubicacion:', res.insertId);
                result(null, res.insertId);
            }
        }
    );
};

module.exports = Ubicacion;
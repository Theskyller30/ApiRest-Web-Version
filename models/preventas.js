const db = require('../config/config');

const Preventa = {};

Preventa.findByUser = (id_user, result) => {
    const sql = `
    SELECT
        id,
        id_placa,
        id_conductor,
        estado_puerto,
        proyecto,
        operativo,
        estado,
        flota,
        inactivo,
        created_at,
        updated_at
    FROM
        preventas
    WHERE
        id_conductor = ?
    `;

    db.query(
        sql,
        id_user,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, data);
            }
        }
    );
}


Preventa.create = (preventa, result) => {
    const sql = `
    INSERT INTO
        preventas(
            id_placa,
            id_conductor,
            estado_puerto,
            proyecto,
            operativo,
            estado,
            flota,
            inactivo,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, [
            preventa.id_placa,
            preventa.id_conductor,
            preventa.estado_puerto,
            preventa.proyecto,
            preventa.operativo,
            preventa.estado,
            preventa.flota,
            preventa.inactivo,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nueva preventa:', res.insertId);
                result(null, res.insertId);
            }
        }
    );
}

Preventa.delete = (id, result) => {
    const sql = `DELETE FROM preventas WHERE id = ?`;

    db.query(sql, id, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

Preventa.getAll = (result) => {
    const sql = `
    SELECT
        id,
        id_placa,
        id_conductor,
        estado_puerto,
        proyecto,
        operativo,
        estado,
        flota,
        inactivo,
        created_at,
        updated_at
    FROM
        preventas
    `;

    db.query(sql, (err, data) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            result(null, data);
        }
    });
}


module.exports = Preventa;
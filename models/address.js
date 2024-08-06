const db = require('../config/config');

const Address = {};

Address.findByUser = (id_user, result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        address,
        neighborhood,
        lat,
        lng,
        lat2,
        lng2,
        lat3,
        lng3,
        CONVERT(id_user, char) AS id_user
    FROM
        address
    WHERE
        id_user = ?
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

    )
}

Address.create = (address, result) => {

    const sql = `
    INSERT INTO
        address(
            address,
            neighborhood,
            lat,
            lng,
            lat2,
            lng2,
            lat3,
            lng3,
            id_user,
            created_at,
            update_at   
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, [
            address.address,
            address.neighborhood,
            address.lat,
            address.lng,
            address.lat2,
            address.lng2,
            address.lat3,
            address.lng3,
            address.id_user,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nueva direccion:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Address.delete = (id, result) => {
    const sql = `DELETE FROM address WHERE id = ?`;

    db.query(sql, id, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}


module.exports = Address;
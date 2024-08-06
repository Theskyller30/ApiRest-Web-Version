const db = require('../config/config');

const Galeries = {};

Galeries.findByCategory = (id_category_galeries, result) => {
    const sql = `
    SELECT
        CONVERT(G.id, char) AS id,
        G.name,
        G.description,
        G.image1,
        G.image2,
        G.image3,
        G.image4,
        G.image5,
        G.image6,
        CONVERT(G.id_category_galeries, char) AS id_category_galeries
    FROM
        galery as G
    WHERE 
        G.id_category_galeries = ?
    ORDER BY
        G.id DESC;  
    `;

    db.query(
        sql, [id_category_galeries],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nuevo producto:', res);
                result(null, res);
            }
        }
    );
}

Galeries.findByNameAndCategory = (name, id_category_galeries, result) => {
    const sql = `
    SELECT
        CONVERT(G.id, char) AS id,
        G.name,
        G.description,
        G.image1,
        G.image2,
        G.image3,
        G.image4,
        G.image5,
        G.image6,
        CONVERT(G.id_category_galeries, char) AS id_category_galeries
    FROM
        galery as G
    WHERE 
        G.id_category_galeries = ? AND LOWER(G.name) LIKE ?
    ORDER BY
        G.id DESC;  
    `;

    db.query(
        sql, [
            id_category_galeries,
            `%${name.toLowerCase()}%`
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nueva GALERIA:', res);
                result(null, res);
            }
        }
    );
}

Galeries.create = (galeries, result) => {

    const sql = `
    INSERT INTO
        galery(
            name,
            description,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6,
            id_category_galeries,
            created_at,
            update_at   
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, [
            galeries.name,
            galeries.description,
            galeries.image1,
            galeries.image2,
            galeries.image3,
            galeries.image4,
            galeries.image5,
            galeries.image6,
            galeries.id_category_galeries,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nueva galeria:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Galeries.update = (galeries, result) => {

    const sql = `
    UPDATE
        galery
    SET
        name = ?,
        description = ?,
        image1 = ?,
        image2 = ?,
        image3 = ?,
        image4 = ?,
        image5 = ?,
        image6 = ?,
        id_category_galeries = ?,
        update_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, [
            galeries.name,
            galeries.description,
            galeries.image1,
            galeries.image2,
            galeries.image3,
            galeries.image4,
            galeries.image5,
            galeries.image6,
            galeries.id_category_galeries,
            new Date(),
            galeries.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la galeria actualizado:', galeries.id);
                result(null, galeries.id);
            }
        }

    )

}


module.exports = Galeries;
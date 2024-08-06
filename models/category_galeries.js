const db = require('../config/config');

const Category_galeries = {};

Category_galeries.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(id, char) AS id,
        name
    FROM
        categories_galery
    ORDER BY
        name
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Categorias:', data);
                result(null, data);
            }
        }
    )
}


Category_galeries.create = (category_galeries, result) => {

    const sql = `
    INSERT INTO
        categories_galery(
            name,
            created_at,
            update_at   
        )
    VALUES(?, ?, ?)
    `;

    db.query(
        sql, [
            category_galeries.name,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nueva categoria de galeria:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}


module.exports = Category_galeries;
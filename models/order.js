const db = require('../config/config');

const Order = {};

Order.findByStatus = (status, result) => {
    const sql = `
        SELECT
            CONVERT(O.id, char) AS id,
            CONVERT(O.id_client, char) AS id_client,
            CONVERT(O.id_address, char) AS id_address,
            CONVERT(O.id_delivery, char) AS id_delivery,
            O.status,
            O.timestamp,
            O.lat,
            O.lng,
            O.lat2,
            O.lng2,
            O.lat3,
            O.lng3,
            O.cita_puerto,
            DATE_FORMAT(O.update_at, '%Y-%m-%d %H:%i:%s') AS update_at,
            O.destinationReached,
            JSON_OBJECT(
                'id', CONVERT(A.id, char),
                'address', A.address,
                'neighborhood', A.neighborhood,
                'lat', A.lat,
                'lng', A.lng,
                'lat2', A.lat2,
                'lng2', A.lng2,
                'lat3', A.lat3,
                'lng3', A.lng3
            ) AS address,
            JSON_OBJECT(
                'id', CONVERT(U.id, char),
                'name', U.name,
                'lastname', U.lastname,
                'image', U.image,
                'phone', U.phone
            ) AS client,
            JSON_OBJECT(
                'id', CONVERT(U2.id, char),
                'name', U2.name,
                'lastname', U2.lastname,
                'image', U2.image,
                'phone', U2.phone
            ) AS delivery,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(P.id, char),
                    'name', P.name,
                    'description', P.description,
                    'image1', P.image1,
                    'image2', P.image2,
                    'image3', P.image3,
                    'quantity', OHP.quantity
                )
            ) AS products
        FROM 
            orders AS O
        INNER JOIN
            users AS U
        ON
            U.id = O.id_client
        LEFT JOIN
            users AS U2
        ON
            U2.id = O.id_delivery
        INNER JOIN
            address AS A
        ON
            A.id = O.id_address 
        INNER JOIN
            order_has_products AS OHP
        ON
            OHP.id_order = O.id
        INNER JOIN
            products AS P
        ON
            P.id = OHP.id_product
        WHERE 
            status = ?
        GROUP BY
            O.id
        ORDER BY
            O.timestamp;
    `;

    db.query(
        sql,
        status,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, data);
            }
        }
    )
};

// AQUI SE EVITA EL NULL 

Order.findByDeliveryAndStatus = (id_delivery, status, result) => {
    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_address, char) AS id_address,
        CONVERT(O.id_delivery, char) AS id_delivery,
        O.status,
        O.timestamp,
        O.cita_puerto, 
        DATE_FORMAT(O.update_at, '%Y-%m-%d %H:%i:%s') AS update_at,
        O.lat,
        O.lng,
        O.lat2,
        O.lng2,
        O.lat3,
        O.lng3,
        O.destinationReached,
        JSON_OBJECT(
            'id', CONVERT(A.id, char),
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng,
            'lat2', A.lat2,
            'lng2', A.lng2,
            'lat3', A.lat3,
            'lng3', A.lng3
        ) AS address,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'phone', U.phone
        ) AS client,
        JSON_OBJECT(
            'id', CONVERT(U2.id, char),
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone
        ) AS delivery,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
    LEFT JOIN
        users AS U2
    ON
        U2.id = O.id_delivery
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address 
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
        O.id_delivery = ? AND O.status = ?
    GROUP BY
        O.id
    ORDER BY
        O.timestamp;
    `;

    db.query(
        sql, [
            id_delivery,
            status
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, data);
            }
        }
    )
};

Order.findByClientAndStatus = (id_client, status, result) => {
    const sql = `
    SELECT
        CONVERT(O.id, char) AS id,
        CONVERT(O.id_client, char) AS id_client,
        CONVERT(O.id_address, char) AS id_address,
        CONVERT(O.id_delivery, char) AS id_delivery,
        O.status,
        O.timestamp,
        DATE_FORMAT(O.update_at, '%Y-%m-%d %H:%i:%s') AS update_at,
        O.cita_puerto,
        O.lat,
        O.lng,
        O.lat2,
        O.lng2,
        O.lat3,
        O.lng3,
        O.destinationReached,
        JSON_OBJECT(
            'id', CONVERT(A.id, char),
            'address', A.address,
            'neighborhood', A.neighborhood,
            'lat', A.lat,
            'lng', A.lng,
            'lat2', A.lat2,
            'lng2', A.lng2,
            'lat3', A.lat3,
            'lng3', A.lng3
        ) AS address,
        JSON_OBJECT(
            'id', CONVERT(U.id, char),
            'name', U.name,
            'lastname', U.lastname,
            'image', U.image,
            'phone', U.phone
        ) AS client,
        JSON_OBJECT(
            'id', CONVERT(U2.id, char),
            'name', U2.name,
            'lastname', U2.lastname,
            'image', U2.image,
            'phone', U2.phone
        ) AS delivery,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', CONVERT(P.id, char),
                'name', P.name,
                'description', P.description,
                'image1', P.image1,
                'image2', P.image2,
                'image3', P.image3,
                'quantity', OHP.quantity
            )
        ) AS products
    FROM 
        orders AS O
    INNER JOIN
        users AS U
    ON
        U.id = O.id_client
    LEFT JOIN
        users AS U2
    ON
        U2.id = O.id_delivery
    INNER JOIN
        address AS A
    ON
        A.id = O.id_address 
    INNER JOIN
        order_has_products AS OHP
    ON
        OHP.id_order = O.id
    INNER JOIN
        products AS P
    ON
        P.id = OHP.id_product
    WHERE 
        O.id_client = ? AND O.status = ?
    GROUP BY
        O.id
    ORDER BY
        O.timestamp DESC;
    `;

    db.query(
        sql, [
            id_client,
            status
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, data);
            }
        }
    )
};

Order.create = (order, result) => {
    const sql = `
        INSERT INTO orders (
            id_client,
            id_address,
            status,
            lat,
            lng,
            lat2,
            lng2,
            lat3,
            lng3,
            destinationReached,  
            timestamp,
            created_at,
            update_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, [
            order.id_client,
            order.id_address,
            'ENCARGOS',
            order.lat,
            order.lng,
            order.lat2,
            order.lng2,
            order.lat3,
            order.lng3,
            0, 
            Date.now(),
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id de la nueva orden:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
};



Order.updateToOnTheWay = (id_order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        status = ?,
        update_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, [
            'EN RUTA',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    )
}

Order.updateDestinationReached = (id_order, destinationReached, result) => {
    const sql = `
    UPDATE orders
    SET destinationReached = ?,
        update_at = ?
    WHERE id = ?
    `;

    db.query(
        sql, [
            destinationReached,
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, res.affectedRows);
            }
        }
    )
}


Order.updateToDispatched = (id_order, id_delivery, cita_puerto, result) => {
    const sql = `
    UPDATE
        orders
    SET
        id_delivery = ?,
        status = ?,
        cita_puerto = ?,
        update_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, [
            id_delivery,
            'ASIGNADOS',
            cita_puerto,
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    )
}

Order.updateToDelivered = (id_order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        status = ?,
        update_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, [
            'FINALIZADOS',
            new Date(),
            id_order
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, id_order);
            }
        }
    )
}

Order.updateLatLng = (order, result) => {
    const sql = `
    UPDATE
        orders
    SET
        lat = ?,
        lng = ?,
        lat2 = ?,
        lng2 = ?,
        lat3 = ?,
        lng3 = ?,
        update_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, [
            order.lat,
            order.lng,
            order.lat2,
            order.lng2,
            order.lat3,
            order.lng3,
            new Date(),
            order.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, order.id);
            }
        }
    )
};

// Añadir en order.js en tu backend
Order.findByDateRange = (startDate, endDate, result) => {
    const sql = `
        SELECT
            CONVERT(O.id, char) AS id,
            CONVERT(O.id_client, char) AS id_client,
            CONVERT(O.id_address, char) AS id_address,
            CONVERT(O.id_delivery, char) AS id_delivery,
            O.status,
            O.timestamp,
            O.lat,
            O.lng,
            O.lat2,
            O.lng2,
            O.lat3,
            O.lng3,
            O.cita_puerto,
            DATE_FORMAT(O.update_at, '%Y-%m-%d %H:%i:%s') AS update_at,
            O.destinationReached,
            JSON_OBJECT(
                'id', CONVERT(A.id, char),
                'address', A.address,
                'neighborhood', A.neighborhood,
                'lat', A.lat,
                'lng', A.lng,
                'lat2', A.lat2,
                'lng2', A.lng2,
                'lat3', A.lat3,
                'lng3', A.lng3
            ) AS address,
            JSON_OBJECT(
                'id', CONVERT(U.id, char),
                'name', U.name,
                'lastname', U.lastname,
                'image', U.image,
                'phone', U.phone
            ) AS client,
            JSON_OBJECT(
                'id', CONVERT(U2.id, char),
                'name', U2.name,
                'lastname', U2.lastname,
                'image', U2.image,
                'phone', U2.phone
            ) AS delivery,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', CONVERT(P.id, char),
                    'name', P.name,
                    'description', P.description,
                    'image1', P.image1,
                    'image2', P.image2,
                    'image3', P.image3,
                    'quantity', OHP.quantity
                )
            ) AS products
        FROM 
            orders AS O
        INNER JOIN
            users AS U ON U.id = O.id_client
        LEFT JOIN
            users AS U2 ON U2.id = O.id_delivery
        INNER JOIN
            address AS A ON A.id = O.id_address 
        INNER JOIN
            order_has_products AS OHP ON OHP.id_order = O.id
        INNER JOIN
            products AS P ON P.id = OHP.id_product
        WHERE 
            DATE(O.update_at) BETWEEN ? AND ?
        GROUP BY
            O.id
        ORDER BY
            O.timestamp;
    `;

    db.query(sql, [startDate, endDate], (err, data) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            result(null, data);
        }
    });
}

Order.getDestinationReachedCounts = (date, result) => {
    const sql = `
        SELECT
            destinationReached,
            COUNT(*) AS total
        FROM
            orders
        WHERE
            DATE(update_at) = ?
        GROUP BY
            destinationReached;
    `;

    db.query(sql, [date], (err, data) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            result(null, data);
        }
    });
};

module.exports = Order;
const db = require('../config/config');

const Product = {};


Product.findByCategory = (id_category, id_user, result) => {
    const sql = `
    SELECT
        CONVERT(P.id, char) AS id,
        P.name,
        P.description,
        P.image1,
        P.image2,
        P.image3,
        CONVERT(P.id_category, char) AS id_category,
        CONVERT(P.id_user_creator, char) AS id_user_creator,
        P.attachment_url,
        P.selected_route,
        P.port_warehouse_date,
        P.fecha_date,
        P.free_days_date,
        P.scheduling_date,
        P.expiration_date,
        P.loading_date,
        P.container_types,
        P.remision,
        P.observaciones,
        P.num_containers,
        P.do_number
    FROM
        products as P
    WHERE 
        P.id_category = ?
        AND P.id_user_creator = ?
        AND P.is_assigned = 0  -- Ensure only unassigned products are fetched
    `;

    db.query(sql, [id_category, id_user], (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Productos no asignados y creados por el usuario:', res);
            result(null, res);
        }
    });
}


Product.findByNameAndCategory = (name, id_category, id_user, result) => {
    const sql = `
    SELECT
        CONVERT(P.id, char) AS id,
        P.name,
        P.description,
        P.image1,
        P.image2,
        P.image3,
        CONVERT(P.id_user_creator, char) AS id_user_creator,
        P.attachment_url,
        P.selected_route,
        P.port_warehouse_date,
        P.fecha_date,
        P.free_days_date,
        P.scheduling_date,
        P.expiration_date,
        P.loading_date,
        P.container_types,
        P.remision,
        P.observaciones,
        P.num_containers,  
        P.do_number 
    FROM
        products as P
    WHERE 
        P.id_category = ? 
        AND LOWER(P.name) LIKE ?
        AND P.id_user_creator = ?
        AND P.is_assigned = 0  
    `;

    db.query(
        sql, [
            id_category,
            `%${name.toLowerCase()}%`,
            id_user
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Productos no asignados y creados por el usuario:', res);
                result(null, res);
            }
        }
    );
}


Product.create = (product, result) => {
    const sql = `
    INSERT INTO products(
        name,
        description,
        image1,
        image2,
        image3,
        id_category,
        id_user_creator,
        selected_route,
        port_warehouse_date,
        fecha_date,
        free_days_date,
        scheduling_date,
        expiration_date,  
        loading_date,     
        attachment_url,
        container_types,
        remision,          
        observaciones,    
        num_containers, 
        do_number,
        is_assigned, 
        created_at,
        updated_at
    )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, [
            product.name,
            product.description,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            product.id_user_creator,
            product.selected_route,
            product.port_warehouse_date,
            product.fecha_date,
            product.free_days_date,
            product.scheduling_date,
            product.expiration_date,
            product.loading_date,
            product.attachment_url,
            product.container_types,
            product.remision,
            product.observaciones,
            product.num_containers,
            product.do_number,
            product.isAssigned,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id del nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}


Product.update = (product, result) => {
    const sql = `
    UPDATE products
    SET
        name = ?,
        description = ?,
        image1 = ?,
        image2 = ?,
        image3 = ?,
        id_category = ?,
        selected_route = ?,
        port_warehouse_date = ?,
        fecha_date = ?,
        free_days_date = ?,
        scheduling_date = ?,
        expiration_date = ?,   
        loading_date = ?,     
        attachment_url = ?,
        container_types = ?, 
        remision = ?,         
        observaciones = ?,
        num_containers = ?, 
        do_number = ?,    
        is_assigned = ?, 
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, [
            product.name,
            product.description,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            product.selected_route,
            product.port_warehouse_date,
            product.fecha_date,
            product.free_days_date,
            product.scheduling_date,
            product.expiration_date,
            product.loading_date,
            product.attachment_url,
            product.container_types,
            product.remision,
            product.observaciones,
            product.num_containers,
            product.do_number,
            product.isAssigned,
            new Date(),
            product.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }
    )
}


Product.countRequestsByDay = (result) => {
    const sql = `
    SELECT
        DATE(created_at) AS request_date,
        COUNT(*) AS request_count
    FROM
        products
    GROUP BY
        DATE(created_at)
    ORDER BY
        request_date
    `;

    db.query(sql, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Solicitudes por día:', res);
            result(null, res);
        }
    });
}

Product.countTotalContainers = (result) => {
    const sql = `
    SELECT SUM(num_containers) AS total_containers
    FROM products
    `;

    db.query(sql, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Total de contenedores:', res[0].total_containers);
            result(null, res[0].total_containers);
        }
    });
}

Product.updateAssignedStatus = (id, isAssigned, result) => {
    const sql = `UPDATE products SET is_assigned = ? WHERE id = ?`;
    db.query(sql, [isAssigned, id], (err, res) => {
        if (err) {
            console.log('Error updating product assigned status:', err);
            result(err, null);
        } else {
            console.log('Product assigned status updated successfully');
            result(null, res);
        }
    });
}

Product.findByDateRange = (startDate, endDate, result) => {
    endDate = new Date(endDate);
    endDate.setHours(23, 59, 59, 999);
    endDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

    const sql = `
        SELECT
            CONVERT(id, char) AS id,
            name,
            description,
            image1,
            image2,
            image3,
            CONVERT(id_category, char) AS id_category,
            CONVERT(id_user_creator, char) AS id_user_creator,
            num_containers,
            created_at
        FROM
            products
        WHERE
            created_at BETWEEN ? AND ?
        ORDER BY
            created_at DESC;
    `;

    db.query(sql, [startDate, endDate], (err, res) => {
        if (err) {
            console.log('Error fetching products by date range:', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Product.findByDateRangeAndCategory = (startDate, endDate, categoryId, result) => {
    endDate = new Date(endDate);
    endDate.setHours(23, 59, 59, 999); // Ensure the end date covers the whole day
    endDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

    const sql = `
        SELECT
            CONVERT(id, char) AS id,
            name,
            description,
            image1,
            image2,
            image3,
            CONVERT(id_category, char) AS id_category,
            CONVERT(id_user_creator, char) AS id_user_creator,
            num_containers,
            created_at
        FROM
            products
        WHERE
            id_category = ?
            AND created_at BETWEEN ? AND ?
        ORDER BY
            created_at DESC;
    `;

    db.query(sql, [categoryId, startDate, endDate], (err, res) => {
        if (err) {
            console.log('Error fetching products by date range and category:', err);
            result(err, null);
        } else {
            console.log('Fetched products by date range and category:', res);
            result(null, res);
        }
    });
};

Product.countByCategory = (result) => {
    const sql = `
        SELECT
            id_category,
            COUNT(*) AS total
        FROM
            products
        GROUP BY
            id_category;
    `;

    db.query(sql, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Total de productos por categoría:', res);
            result(null, res);
        }
    });
}

Product.countByCategoryAndDate = (date, result) => {
    const sql = `
        SELECT
            id_category,
            COUNT(*) AS total
        FROM
            products
        WHERE
            DATE(created_at) = ?
        GROUP BY
            id_category;
    `;

    db.query(sql, [date], (err, res) => {
        if (err) {
            console.log('Error fetching product counts by category and date:', err);
            result(err, null);
        } else {
            console.log('Product counts by category and date fetched successfully:', res);
            result(null, res);
        }
    });
}

// NUEVOSSS METODOOOOSSSSS --------------------------------------------------------------------

Product.countContainersByCategory = (result) => {
    const sql = `
        SELECT
            id_category,
            SUM(num_containers) AS total_containers
        FROM
            products
        GROUP BY
            id_category;
    `;

    db.query(sql, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Total de contenedores por categoría:', res);
            result(null, res);
        }
    });
}

Product.countContainersByCategoryAndDate = (date, result) => {
    const sql = `
        SELECT
            id_category,
            SUM(num_containers) AS total_containers
        FROM
            products
        WHERE
            DATE(created_at) = ?
        GROUP BY
            id_category;
    `;

    db.query(sql, [date], (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Total de contenedores por categoría y fecha:', res);
            result(null, res);
        }
    });
}




module.exports = Product;
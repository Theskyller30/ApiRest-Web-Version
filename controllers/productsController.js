const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    findByCategory(req, res) {
        const id_category = req.params.id_category;
        const id_user = req.user.id; // Obtiene el ID del usuario autenticado

        Product.findByCategory(id_category, id_user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorías',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

    findByDateRange(req, res) {
        const { startDate, endDate } = req.params; // Correctly extracting params
        
        Product.findByDateRange(startDate, endDate, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error retrieving products by date range',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Products retrieved successfully',
                data: data
            });
        });
    },

    countByCategory(req, res) {
        Product.countByCategory((err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al contar productos por categoría',
                    error: err
                });
            }
            const categoryCounts = data.reduce((acc, item) => {
                acc[item.id_category] = item.total;
                return acc;
            }, {});
    
            return res.status(200).json({
                success: true,
                message: 'Conteo de productos por categoría recuperado con éxito',
                data: categoryCounts
            });
        });
    },
    
    findByDateRangeAndCategory(req, res) {
        const { startDate, endDate, idCategory } = req.params; // Asume que los parámetros se pasan como parte de la URL
    
        Product.findByDateRangeAndCategory(startDate, endDate, idCategory, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al recuperar productos por rango de fechas y categoría',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Productos recuperados con éxito por rango de fechas y categoría',
                data: data
            });
        });
    },
    
    countRequestsByDay(req, res) {
        Product.countRequestsByDay((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al contar las solicitudes por día',
                    error: err
                });
            }

            return res.status(200).json(data);
        });
    },

    countTotalContainers(req, res) {
        Product.countTotalContainers((err, totalContainers) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al contar el total de contenedores',
                    error: err
                });
            }

            return res.status(200).json({ total_containers: totalContainers });
        });
    },

    updateProductAssignedStatus(req, res) {
        const id = req.params.id;
        const { isAssigned } = req.body;

        Product.updateAssignedStatus(id, isAssigned, (err, result) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al actualizar el estado de asignación del producto',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Estado de asignación actualizado correctamente',
                data: result
            });
        });
    },

    findByNameAndCategory(req, res) {
        const id_category = req.params.id_category;
        const name = req.params.name;
        const id_user = req.user.id; // Obtiene el ID del usuario autenticado

        Product.findByNameAndCategory(name, id_category, id_user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorías',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

    countByCategoryAndDate(req, res) {
        const date = req.params.date; // Asumimos que la fecha se pasa como parámetro en la URL
    
        Product.countByCategoryAndDate(date, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al contar productos por categoría y fecha',
                    error: err
                });
            }
            const categoryCounts = data.reduce((acc, item) => {
                acc[item.id_category] = item.total;
                return acc;
            }, {});
            return res.status(200).json({
                success: true,
                message: 'Conteo de productos por categoría y fecha recuperado con éxito',
                data: categoryCounts
            });
        });
    },

    countContainersByCategoryToday(req, res) {
        const today = new Date();
        const startDate = today.toISOString().slice(0, 10); // Formato YYYY-MM-DD
    
        Product.countContainersByCategoryAndDate(startDate, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al contar contenedores por categoría para el día de hoy',
                    error: err
                });
            }
    
            const containersByCategory = data.reduce((acc, item) => {
                acc[item.id_category] = item.total_containers;
                return acc;
            }, {});
    
            return res.status(200).json({
                success: true,
                message: 'Conteo de contenedores por categoría para el día de hoy recuperado con éxito',
                data: containersByCategory
            });
        });
    },
    
    
    create(req, res) {
        let product = JSON.parse(req.body.product);
        product.id_user_creator = req.userId;
        product.scheduling_date = req.body.scheduling_date;
        product.attachmentUrl = req.body.attachmentUrl;
        product.container_types = req.body.container_types;
        product.remision = req.body.remision;
        product.observaciones = req.body.observaciones;
        product.expiration_date = req.body.expiration_date;
        product.loading_date = req.body.loading_date;
        product.num_containers = req.body.num_containers;
        product.do_number = req.body.do_number;
        product.is_assigned = req.body.is_assigned || false;

        const files = req.files || [];

        Product.create(product, (err, id_product) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la solicitud de servicio',
                    error: err
                });
            }

            product.id = id_product;
            if (files.length > 0) {
                const start = async() => {
                    let inserts = 0;
                    await asyncForEach(files, async(file) => {
                        const path = `image_${Date.now()}`;
                        const url = await storage(file, path);

                        if (url != undefined && url != null) {
                            if (inserts == 0) {
                                product.image1 = url;
                            } else if (inserts == 1) {
                                product.image2 = url;
                            } else if (inserts == 2) {
                                product.image3 = url;
                            }
                        }

                        await Product.update(product, (err, data) => {
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Hubo un error con la solicitud',
                                    error: err
                                });
                            }

                            inserts = inserts + 1;

                            if (inserts == files.length) {
                                return res.status(201).json({
                                    success: true,
                                    message: 'La Solicitud se genero correctamente',
                                    data: data
                                });
                            }
                        });
                    });
                };
                start();
            } else {
                return res.status(201).json({
                    success: true,
                    message: 'La solicitud se generó correctamente',
                    data: {
                        product,
                        id: id_product,
                    }
                });
            }
        });
    },

    // Nuevo método para contar contenedores por categoría
    countContainersByCategory(req, res) {
        Product.countContainersByCategory((err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al contar contenedores por categoría',
                    error: err
                });
            }

            const containersByCategory = data.reduce((acc, item) => {
                acc[item.id_category] = item.total_containers;
                return acc;
            }, {});

            return res.status(200).json({
                success: true,
                message: 'Conteo de contenedores por categoría recuperado con éxito',
                data: containersByCategory
            });
        });
    }
};
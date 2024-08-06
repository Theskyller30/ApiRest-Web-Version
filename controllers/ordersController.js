const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const User = require('../models/user');
const PushNotificationsController = require('../controllers/pushNotificationsController');

module.exports = {
    findByStatus(req, res) {
        const status = req.params.status;

        Order.findByStatus(status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.delivery = JSON.parse(d.delivery);
                d.products = JSON.parse(d.products);
            }

            return res.status(201).json(data);
        });
    },

    findByClientAndStatus(req, res) {
        const id_client = req.params.id_client;
        const status = req.params.status;

        Order.findByClientAndStatus(id_client, status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.delivery = JSON.parse(d.delivery);
                d.products = JSON.parse(d.products);
            }

            return res.status(201).json(data);
        });
    },

    getDestinationReachedCounts(req, res) {
        const date = new Date().toISOString().slice(0, 10); // Obtén la fecha actual en formato YYYY-MM-DD
        Order.getDestinationReachedCounts(date, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al obtener los conteos de destinationReached',
                    error: err
                });
            }
            // Convertir datos si es necesario o devolver directamente
            const formattedData = data.map(item => ({
                destinationReached: item.destinationReached,
                total: item.total
            }));
            return res.status(200).json({
                success: true,
                message: 'Conteos de destinationReached obtenidos correctamente',
                data: formattedData
            });
        });
    },

    async create(req, res) {
        const order = req.body;

        Order.create(order, async (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de crear la orden',
                    error: err
                });
            }

            for (const product of order.products) {
                await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Hubo un error con la creación de la rita en la orden',
                            error: err
                        });
                    }
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha creado correctamente',
                data: `${id}` // EL ID DE LA NUEVA CATEGORÍA
            });
        });
    },

    findByDeliveryAndStatus(req, res) {
        const id_delivery = req.params.id_delivery;
        const status = req.params.status;

        Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.delivery = JSON.parse(d.delivery);
                d.products = JSON.parse(d.products);
            }

            return res.status(201).json(data);
        });
    },

    findByDateRange(req, res) {
        const { startDate, endDate } = req.params; // Asumimos que los parámetros vienen de la URL

        Order.findByDateRange(startDate, endDate, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las ordenes por rango de fechas',
                    error: err
                });
            }

            // Parse JSON fields
            data.forEach(order => {
                order.address = JSON.parse(order.address);
                order.client = JSON.parse(order.client);
                order.delivery = JSON.parse(order.delivery);
                order.products = JSON.parse(order.products);
            });

            return res.status(200).json(data);
        });
    },

    updateDestinationReached(req, res) {
        const { id, destinationReached } = req.body;

        Order.updateDestinationReached(id, destinationReached, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar el estado de destino alcanzado de la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El estado de destino alcanzado de la orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID de la orden actualizada
            });
        });
    },

    updateToDispatched(req, res) {
        const order = req.body;

        Order.updateToDispatched(order.id, order.id_delivery, order.cita_puerto, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            User.findById(order.id_delivery, (err, user) => {
                if (user !== undefined && user !== null) {
                    console.log('NOTIFICATION TOKEN', user.notification_token);
                    PushNotificationsController.sendNotification(user.notification_token, {
                        title: 'RUTA ASIGNADA',
                        body: 'Te han asignado un encargo para salir a ruta',
                        id_notification: '1'
                    });
                }
            });

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });
        });
    },

    updateToOnTheWay(req, res) {
        const order = req.body;

        console.log('Order:', order);

        Order.updateToOnTheWay(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            // Enviar notificación al cliente sobre el inicio de la ruta
            User.findById(order.id_delivery, (err, user) => {
                if (err) {
                    console.log('Error al obtener el usuario:', err);
                } else if (user && user.notification_token) {
                    console.log('Sending notification to:', user.notification_token);
                    PushNotificationsController.sendNotification(user.notification_token, {
                        title: 'Ruta Iniciada',
                        body: 'Tu pedido está en camino!',
                        id_notification: '2'
                    });
                }
            });

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente y la notificación ha sido enviada',
                data: `${id_order}` // EL ID 
            });
        });
    },

    updateToDelivered(req, res) {
        const order = req.body;

        Order.updateToDelivered(order.id, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            // Enviar notificación al cliente que su pedido ha sido entregado
            User.findById(order.id_client, (err, user) => {
                if (err) {
                    console.log('Error al obtener el usuario:', err);
                } else if (user && user.notification_token) {
                    console.log('Sending notification to:', user.notification_token);
                    PushNotificationsController.sendNotification(user.notification_token, {
                        title: 'Pedido Entregado',
                        body: 'Tu pedido ha sido entregado exitosamente!',
                        id_notification: '3' // Asegúrate de manejar IDs únicos para cada tipo de notificación si es necesario
                    });
                }
            });

            return res.status(201).json({
                success: true,
                message: 'La orden se ha finalizado correctamente y la notificación ha sido enviada',
                data: `${id_order}` // EL ID 
            });
        });
    },

    updateLatLng(req, res) {
        const order = req.body;

        Order.updateLatLng(order, (err, id_order) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de actualizar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La orden se ha actualizado correctamente',
                data: `${id_order}` // EL ID 
            });
        });
    }
};

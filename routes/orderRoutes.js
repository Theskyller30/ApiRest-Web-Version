const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', { session: false }), OrdersController.findByStatus);
    app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', { session: false }), OrdersController.findByDeliveryAndStatus);
    app.get('/api/orders/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', { session: false }), OrdersController.findByClientAndStatus);
    app.get('/api/orders/findByDateRange/:startDate/:endDate', passport.authenticate('jwt', { session: false }), OrdersController.findByDateRange);
    
    // Nueva ruta para obtener los conteos de destinationReached
    app.get('/api/orders/destinationreachedcounts', passport.authenticate('jwt', { session: false }), OrdersController.getDestinationReachedCounts);


    // POST -> ALMACENAR DATOS
    app.post('/api/orders/create', passport.authenticate('jwt', { session: false }), OrdersController.create);

    // PUT -> ACTUALIZAR DATOS
    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', { session: false }), OrdersController.updateToDispatched);
    app.put('/api/orders/updateToOnTheWay', passport.authenticate('jwt', { session: false }), OrdersController.updateToOnTheWay);
    app.put('/api/orders/updateToDelivered', passport.authenticate('jwt', { session: false }), OrdersController.updateToDelivered);
    app.put('/api/orders/updateLatLng', passport.authenticate('jwt', { session: false }), OrdersController.updateLatLng);
    app.put('/api/orders/updateDestinationReached', passport.authenticate('jwt', { session: false }), OrdersController.updateDestinationReached);
}

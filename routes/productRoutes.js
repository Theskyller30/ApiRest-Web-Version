const productsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', { session: false }), productsController.findByCategory);
    app.get('/api/products/findByNameAndCategory/:id_category/:name', passport.authenticate('jwt', { session: false }), productsController.findByNameAndCategory);
    app.get('/api/products/findByDateRange/:startDate/:endDate', passport.authenticate('jwt', { session: false }), productsController.findByDateRange);
    app.get('/api/products/findByDateRangeAndCategory/:startDate/:endDate/:idCategory', passport.authenticate('jwt', { session: false }), productsController.findByDateRangeAndCategory);
    app.get('/api/products/countRequestsByDay', passport.authenticate('jwt', { session: false }), productsController.countRequestsByDay);
    app.get('/api/products/countTotalContainers', passport.authenticate('jwt', { session: false }), productsController.countTotalContainers);
    app.get('/api/products/countByCategory', passport.authenticate('jwt', { session: false }), productsController.countByCategory);
    app.get('/api/products/countByCategoryAndDate/:date', passport.authenticate('jwt', { session: false }), productsController.countByCategoryAndDate);
    app.get('/api/products/countContainersByCategory', passport.authenticate('jwt', { session: false }), productsController.countContainersByCategory); // Nueva ruta para contar contenedores por categoría
    app.get('/api/products/countContainersByCategoryToday', passport.authenticate('jwt', { session: false }), productsController.countContainersByCategoryToday);

    // POST -> ALMACENAR DATOS
    app.post('/api/products/create', passport.authenticate('jwt', { session: false }), upload.array('image', 3), (req, res, next) => {
        req.userId = req.user.id; // Asegúrate de que el ID del usuario esté en req.user.id
        next();
    }, productsController.create);

    // PATCH -> ACTUALIZAR PARTE DE LOS DATOS
    app.patch('/api/products/updateAssignedStatus/:id', passport.authenticate('jwt', { session: false }), productsController.updateProductAssignedStatus);

    // Añadir más rutas si es necesario
};

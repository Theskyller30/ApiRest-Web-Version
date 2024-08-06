const placasController = require('../controllers/placasController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/placas/getAll', passport.authenticate('jwt', { session: false }), placasController.getAll);

    app.post('/api/placas/create', passport.authenticate('jwt', { session: false }), placasController.create);

}
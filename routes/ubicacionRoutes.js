const ubicacionController = require('../controllers/ubicacionController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/ubicacion/getAll', passport.authenticate('jwt', { session: false }), ubicacionController.getAll);

    app.post('/api/ubicacion/create', passport.authenticate('jwt', { session: false }), ubicacionController.create);

}
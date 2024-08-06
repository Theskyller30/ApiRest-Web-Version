const preventasController = require('../controllers/preventasController');
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/preventas/findByUser/:id_user', passport.authenticate('jwt', { session: false }), preventasController.findByUser);
    app.post('/api/preventas/create', passport.authenticate('jwt', { session: false }), preventasController.create);
    app.delete('/api/preventas/delete/:id', passport.authenticate('jwt', { session: false }), preventasController.delete);

    // Agrega esta línea para el endpoint de obtener todas las preventas
    app.get('/api/preventas/getAll', passport.authenticate('jwt', { session: false }), preventasController.getAll);
}
const addressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/address/findByUser/:id_user', passport.authenticate('jwt', { session: false }), addressController.findByUser);
    app.post('/api/address/create', passport.authenticate('jwt', { session: false }), addressController.create);

    // Agrega esta línea para el endpoint de eliminar dirección
    app.delete('/api/address/delete/:id', passport.authenticate('jwt', { session: false }), addressController.delete);
}
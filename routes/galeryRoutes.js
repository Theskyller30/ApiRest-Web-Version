const galeryController = require('../controllers/galeryController');
const passport = require('passport');

module.exports = (app, upload) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/galeries/findByCategory/:id_category_galeries', passport.authenticate('jwt', { session: false }), galeryController.findByCategory);
    app.get('/api/galeries/findByNameAndCategory/:id_category_galeries/:name', passport.authenticate('jwt', { session: false }), galeryController.findByNameAndCategory);
    app.post('/api/galeries/create', passport.authenticate('jwt', { session: false }), upload.array('image', 6), galeryController.create);



}
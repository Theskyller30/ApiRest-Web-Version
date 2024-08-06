const categories_galeryController = require('../controllers/categories_galeryController');
const passport = require('passport');

module.exports = (app) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/categories_galery/getAll', passport.authenticate('jwt', { session: false }), categories_galeryController.getAll);

    app.post('/api/categories_galery/create', passport.authenticate('jwt', { session: false }), categories_galeryController.create);


}
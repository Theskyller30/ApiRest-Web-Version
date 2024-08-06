const Preventa = require('../models/preventas');

module.exports = {

    findByUser(req, res) {
        const id_user = req.params.id_user;
        Preventa.findByUser(id_user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al tratar de obtener las preventas',
                    error: err
                });
            }

            return res.status(201).json(data);
        })
    },

    getAll(req, res) {
        Preventa.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al tratar de obtener todas las preventas',
                    error: err
                });
            }

            return res.status(200).json(data);
        });
    },


    delete(req, res) {
        const id = req.params.id;

        Preventa.delete(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al tratar de eliminar la preventa',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La preventa se eliminó correctamente'
            });
        });
    },


    create(req, res) {

        const preventa = req.body;
        console.log('PREVENTA: ', preventa);

        Preventa.create(preventa, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la preventa',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La preventa se creó correctamente',
                data: `${id}` // EL ID DE LA NUEVA PREVENTA
            });

        });

    },
}
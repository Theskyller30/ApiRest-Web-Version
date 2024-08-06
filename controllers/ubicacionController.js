const Ubicacion = require('../models/ubicacion');

module.exports = {

    getAll(req, res) {
        Ubicacion.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al tratar de obtener las ubicaciones',
                    error: err
                });
            }

            return res.status(200).json(data);
        })
    },

    create(req, res) {

        const ubicacion = req.body;
        console.log('UBICACION: ', ubicacion);

        Ubicacion.create(ubicacion, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la ubicacion',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La ubicacion se creo correctamente',
                data: `${id}` // EL ID DE LA NUEVA UBICACION
            });

        });

    },

}
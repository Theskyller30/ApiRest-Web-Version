const Placa = require('../models/placas');

module.exports = {

    getAll(req, res) {
        Placa.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al tratar de obtener las placas',
                    error: err
                });
            }

            return res.status(200).json(data);
        });
    },

    create(req, res) {
        const placa = req.body;
        console.log('PLACA: ', placa);

        Placa.create(placa, (err, id) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de la placa',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'La placa se creo correctamente',
                data: `${id}` // EL ID DE LA NUEVA PLACA
            });
        });
    },

}
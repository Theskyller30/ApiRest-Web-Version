const Galeries = require('../models/galeries');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    findByCategory(req, res) {
        const id_category_galeries = req.params.id_category_galeries;

        Galeries.findByCategory(id_category_galeries, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    findByNameAndCategory(req, res) {
        const id_category_galeries = req.params.id_category_galeries;
        const name = req.params.name;

        Galeries.findByNameAndCategory(name, id_category_galeries, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las categorias',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    create(req, res) {

        const galeries = JSON.parse(req.body.galeries); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        let inserts = 0;

        if (files.length === 0) {
            return res.status(501).json({
                success: false,
                message: 'Error al subir las imagenes',
            });
        } else {
            Galeries.create(galeries, (err, id_galeries) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro de las imagenes',
                        error: err
                    });
                }

                galeries.id = id_galeries;
                const start = async() => {
                    await asyncForEach(files, async(file) => {
                        const path = `image_${Date.now()}`;
                        const url = await storage(file, path);

                        if (url != undefined && url != null) { // CREO LA IMAGEN EN FIREBASE
                            if (inserts == 0) { //IMAGEN 1
                                galeries.image1 = url;
                            } else if (inserts == 1) { //IMAGEN 2
                                galeries.image2 = url;
                            } else if (inserts == 2) { //IMAGEN 3
                                galeries.image3 = url;
                            } else if (inserts == 3) { //IMAGEN 4
                                galeries.image4 = url;
                            } else if (inserts == 4) { //IMAGEN 5
                                galeries.image5 = url;
                            } else if (inserts == 5) { //IMAGEN 6
                                galeries.image6 = url;
                            }
                        }

                        await Galeries.update(galeries, (err, data) => {
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Hubo un error con el registro de las imagenes',
                                    error: err
                                });
                            }

                            inserts = inserts + 1;

                            if (inserts == files.length) { // TERMINO DE ALAMACENAR LAS TRES IMAGENES
                                return res.status(201).json({
                                    success: true,
                                    message: 'La GALERIA se almaceno correctamente',
                                    data: data
                                });
                            }

                        });
                    });
                }

                start();

            });
        }

    }

}
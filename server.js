const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const io = require('socket.io')(server);



/*
 * IMPORTAR SOCKETS
 */
const ordersSocket = require('./sockets/ordersSocket');


/*
 * IMPORTAR RUTAS
 */
const usersRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/orderRoutes');
const galeryRoutes = require('./routes/galeryRoutes');
const categories_galeryRoutes = require('./routes/category_galeriesRoutes');
const ubicacionRoutes = require('./routes/ubicacionRoutes');
const preventasRoutes = require('./routes/preventasRoutes');
const placasRoutes = require('./routes/placasRoutes');



const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cors({
  origin: 'https://serpomar-cliente-web.vercel.app', 
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true  
}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);


/*
 * LLAMADO A LOS SOCKETS
 */
ordersSocket(io);


const upload = multer({
    storage: multer.memoryStorage()
});

/*
 * LLAMADO DE LAS RUTAS
 */
usersRoutes(app, upload);
categoriesRoutes(app);
addressRoutes(app);
productRoutes(app, upload);
ordersRoutes(app);
galeryRoutes(app, upload);
categories_galeryRoutes(app);
ubicacionRoutes(app);
preventasRoutes(app);
placasRoutes(app);



server.listen(port, () => {
    console.log('Aplicación de NodeJS ' + port + ' Iniciada...');
});


// server.listen(3000, '192.168.1.6' || 'localhost ', function() {
//     console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
// });


app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

app.get('/test', (req, res) => {
    res.send('Esta es la RUTA test');
});


// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});


// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR

const mysql = require('mysql');


//SERPOMARDB
// const db = mysql.createConnection({
//     host: '192.168.4.81', // Reemplaza con la IP correcta
//     user: 'root',
//     password: '', // Asegúrate de usar la contraseña correcta aquí
//     database: 'bd_serpomar_driver',
//     port: 3306,
// });



// HUBEMAR
// const db = mysql.createConnection({
//     host: '198.162.1.4',
//     user: 'root',
//     password: '',
//     database: 'serpomar',
//     port: 3306,
// });

// LOCAL
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'bd_serpomar_driver'
// });

const db = mysql.createConnection({
    host: '190.109.19.165',
    user: 'dev',
    password: '1007264290.,0',
    database: 'bd_serpomar_driver',
    port: 3306,
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;
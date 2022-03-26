const express = require('express');
var cors = require('cors');

class Server {

    constructor(dirname){
        this.app = express();
        this.port = process.env.PORT;
        this.productsPath = '/productos';
        this.dirname = dirname;
        this.viewsPath = `${String.fromCharCode(92)}views`;
        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();

        //vistas de la app
        this.views();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        this.app.use( express.urlencoded({ extended: true }) );

        //Directorio público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.productsPath, require('../routes/products.routes'));

    }

    views() {
        //motores de plantillas  -- En este caso PUG
        this.app.set('views', this.dirname + this.viewsPath);
        this.app.set('view engine', 'ejs');
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor activo en puerto', this.port);
        });
    }

}


module.exports = Server;
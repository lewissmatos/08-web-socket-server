const express = require('express');
const cors = require('cors');

const { socketController } = require('../socketsControolers/socket.controller');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        //Eventos por sockets

        this.socketEvents();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );
        
    }

    routes() {        
        // this.app.use( this.paths.auth, require('../routes/auth'));        
    }

    socketEvents() {

        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`\nServidor corriendo en puerto: ${this.port} con socket.io`.rainbow);
        });
    }

}

module.exports = Server;

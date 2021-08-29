require('dotenv').config(); 


const Server = require('./models/server');
const { Contenedor } = require('./src/helpers/contenedor');

const server = new Server(__dirname);

server.listen();
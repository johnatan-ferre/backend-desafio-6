const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

const ItemsApi = require('../contenedores/ContenedorMemoria')

//--------------------------------------------
// instancio servidor, socket y api

const app = express();

const itemsApi = new ItemsApi()
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const mensajes = [];


//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('cliente conectado');
    
    //productos
    socket.emit('productos', itemsApi);
    socket.on('new-producto', data => {
        itemsApi.save(data);
        const items = itemsApi.listAll()
        io.sockets.emit('productos', items);
    });

    //chat
    socket.emit('mensajes', mensajes);
    socket.on('new-message', data => {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
    });
    
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

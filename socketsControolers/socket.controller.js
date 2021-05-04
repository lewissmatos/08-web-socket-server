const colors = require('colors');

exports.socketController = socket => {

    console.log('Cliente conectado'.blue, 'ID: ', socket.id);

    socket.on('disconnect', () =>{
        console.log('Cliente desconectado'.yellow, 'ID: ', socket.id);
    });

    socket.on('send-msg', (payload, callback)=>{
        
        callback(payload.idMsg);

        socket.broadcast.emit('msg-from-server', payload);
    });
    
};
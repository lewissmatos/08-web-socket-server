
//Referencias de html

const lblOnline =  document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const lblIdMsg = document.querySelector('#lblIdMsg');
const lblBodyMsg = document.querySelector('#lblBodyMsg');

const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');
const socket = io();

socket.on('connect', ()=>{
    
    // console.log('Socket conectado');
    
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () =>{      
    
    // console.log('Socket desconectado');
 
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

btnSend.addEventListener('click', () => {

    const msg = txtMessage.value;

    const date = new Date().getTime();
    const idMsg = date * 12 + (4 * 8) + '';
    const payload = {
        msg, 
        idMsg,
    };
   
    socket.emit('send-msg', payload, (idMsg)=>{
        console.log(`ID del msnaej enviado: ${idMsg}`);
    });

});

socket.on('msg-from-server', (payload) => {
    // console.log(payload);
    lblIdMsg.innerHTML = payload.idMsg;
    lblBodyMsg.innerHTML = payload.msg;
});
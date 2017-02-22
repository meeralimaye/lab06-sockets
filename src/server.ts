import net = require('net');
import ip = require('ip');


interface Address { port: number; family: string; address: string; };


let server:net.Server = net.createServer();


let clients: net.Socket[] = [];

server.on('connection', function(socket:net.Socket){
  
    function broadcast(name:String, message:String){
        clients.forEach(function(client:net.Socket) {
            
            if (client !== socket) {
                client.write('[' + name + '] ' + message + '\n');
            }
        });
    }

    console.log('connected :' + socket.remoteAddress);
    clients.push(socket);

    socket.write("Hi what's your name? \n");
    let name: String = '';

    socket.on('data', function(data){
        let message:String = data.toString();
        if(message.length === 0){
            socket.write('(type something and hit return)\n');
            return;
        }

        
        if (!name) {
           
            name = data.toString().substr(0, 10);

           
            socket.write('Hello ' + name + '!\n');
            socket.write('Welcome to the chat room, ' + name + '!\n');
            socket.write('There are ' + clients.length + ' people here.\n');
            socket.write("Type messages, or type 'exit' at any time to leave.\n");
        }
        else {
           
            if ('exit' === message) {
                socket.end();
            }
            else {
              
                broadcast(name, message);
            }
        }
    });

    

});


server.on('listening', function() {
   
    var addr:Address = server.address();
    console.log(addr.address);
    console.log('server listening on port %d', addr.port);
});


server.listen({
  host: ip.address(),
  port: 3000
});
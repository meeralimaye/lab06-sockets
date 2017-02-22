'use strict';

const net = require('net'),
    readline = require('readline'),
    client = new net.Socket(),
    io = readline.createInterface(process.stdin, process.stdout);
    

client.on('data', function(data) { 
    console.log("Received: "+data + '\n'); 
});

client.on('close', function() { 
    console.log('server disconnected');
    console.log('closing client');
    process.exit(0);
});


var HOST = '127.0.0.1';
var PORT = 3000;


client.connect(PORT, HOST, function() {
    console.log('Connected to: ' + HOST + ':' + PORT);
    
    
    io.setPrompt('> ');
    io.prompt();

    io.on('line', function(line){
        switch(line.trim()) {
        case 'exit':
            client.end();
            console.log('client disconnected');
            process.exit(0);
            break;
        default:
            client.write(line);
            break;
        }
      
        io.prompt();
    }).on('close', function() {
      
        client.end();
        console.log('client disconnected');
        process.exit(0);
    });


});

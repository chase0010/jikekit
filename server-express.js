import express from 'express';


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.set('port', process.env.PORT || 3000);
app.use('/', express.static('src'));

io.on('connection', function(socket){
  console.log('一个新用户连接');

});


server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';
import socketIO from 'socket.io';
import config from 'config';

import dbSetup from './server/dbSetup';
import * as api from './server/api/http';
import * as eventService from './server/api/service/node';

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

const io = socketIO(httpServer);

dbSetup();

app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * RESTful API
 */
 app.get('/api/node/:model', api.getNodes);
 app.get('/api/node/:model/:id', api.getActiveNode);
 app.post('/api/node/:model', api.addNode);
 app.post('/api/node/:model/:id', api.updateNode);
 app.delete('/api/node/:model/:id', api.deleteNode);

 app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'public', 'favicon.ico')));

// 在你应用 JavaScript 文件中包含了一个 script 标签的 index.html 中处理任何一个 route
/*
app.get('*', function (request, response){
	response.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});
*/

app.get(/master/, function (request, response) {
  response.render('index', { title: 'master客户端', message: 'Hello master客户端!', jsname:'bundle'});
});

app.get('*', function (request, response) {
  response.render('index', { title: 'jikekit微信', message: 'Hello wexin!', jsname:'bundle'});
});

eventService.liveUpdates('posts',io);

httpServer.listen(port, function() {
	console.log('Express server listening on port ' + port);
});

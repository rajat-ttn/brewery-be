'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const amqp = require('amqplib/callback_api');

const app = express();
const server = require('http').Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);

const { RABBITMQ_CONF } = require("./constant");
const routes =  require('./routes.js')({io:io});

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

//allow cors
app.use(cors());

// bind main router here.
app.use('/', routes);

//Error handling code below:-

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler - will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        console.log('error is '+ err);
        res.send({
            error: err,
            errorMsg:err.message
        });
    });
}

// production error handler - no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log('error is '+ err);
    res.send({
        errorMsg:err.message
    });
});


io.on('connection', socket => {
    console.log('a user connected');
});

amqp.connect('amqp://localhost', (err, conn) => {
    conn.createChannel((err, ch) => {
        const QUEUE_CONF = RABBITMQ_CONF.queue;
        ch.assertQueue(QUEUE_CONF.name, { durable: QUEUE_CONF.durable, messageTtl: QUEUE_CONF.messageTtl });
        ch.consume(QUEUE_CONF.name, data => {
            const container_temperature = data.content.toString();
            console.log(" [x] Received %s", data.content.toString());
            io.emit('CONTAINER_TEMPERATURE_CHANGE', container_temperature);
        }, {noAck: true});
    });
});


module.exports = server;
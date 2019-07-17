var express = require('express');
var routes = require('./routes');
var todo = require('./routes/todo');
var http = require('http');
var path = require('path');

var app = express();
var port = 3000;

// app 설정
app.configure(function() {
    app.set('port', port);                      // Web Server Port
    app.set('views', __dirname + '/views');     // Template
    app.set('view engine', 'ejs');              // Template Engine(ejs)
    app.use(express, favicon());                // Favicon
    app.use(express.logger('dev'));             // Logue
    app.use(express.bodyParser());              // Parsing request body
    app.use(express.methodOverride());          // Supproting methods of old ver. browsers
    app.use(app.router);                        // Routing

    // 정적 리소스 처리
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});


// Routing
app.get('/', routes.index);
app.get('/list', todo.list);
app.post('/add', todo.add);
app.post('/complete', todo.conplete);
app.post('/del', todo.del);


// Execute Server
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
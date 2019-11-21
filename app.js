const express = require('express');
const routes = require('./routes');
const http = require('http');
const path = require('path');
const engine = require('ejs-locals');
const restful = require("./routes/restful.js");
const app = express();
var exec = require('child_process').exec, child;

app.set('port', process.env.PORT || 8888);
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(path.join(__dirname, 'public','images','favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(require('express-useragent').express());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

process.on('uncaughtException', function (err) {
	 console.log('Process Exception: ' + err);
	 console.log(err.stack);
});

app.all("*", function(req, res, next){
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	next();
});


console.log('start');
// const url = req.body.url;
// var spawn = require('child_process').spawn, ls = spawn('ls', ['-a']);
// var options = {maxBuffer:1024*1024*100, encoding:'utf8', timeout:5000};
// spawn('java -jar ./youtube/Tagging.jar https://www.youtube.com/watch?v=PoKpbxa96pE ./public/youtube/img ./public/youtube/blank', options)
// var child = childProcess.spawn('java -jar ./youtube/Tagging.jar https://www.youtube.com/watch?v=0u8o-C7nCcs ./public/youtube/img ./public/youtube/blank', options);
// child.stdout.on('data', (d) => {
//   console.log(d.toString())
// })
// child.stdout.on('data', (d) => {
//   console.log(d.toString())
// })
// child.('error', (e) => {
//   console.log(e.toString())
// })

child = exec(`java -jar ./youtube/Tagging.jar https://www.youtube.com/watch?v=PoKpbxa96pE ./public/youtube/img ./public/youtube/blank`,
function (error, stdout, stderr){
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if(error !== null){
		console.log('exec error: ' + error);
	}
});



app.get('/', routes.index);
app.get('/active_process', restful.active_process);
// app.get('/tagging', routes.tagging);
// app.get('/category', routes.statistics);
// // app.get('/statistics', routes.statistics);
// app.get('/category/detail/:no', routes.detail);

// app.get('/rest/category_list', restful.category_list);
// app.post('/rest/active_tagging', restful.active_tagging);


/*
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80, '0.0.0.0');
*/

http.createServer(app).listen(app.get('port'), '0.0.0.0', function(){
	console.log("Https server listening on port " + app.get('port'));
});

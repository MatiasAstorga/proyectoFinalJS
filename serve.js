var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/'));
// app.use('/', function(req, res){
// 	res.redirect('/app');
// })

app.listen(process.env.npm_package_config_port);
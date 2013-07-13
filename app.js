
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , jade = require('jade');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('jade').__express);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get("/index", function(req, res) { 
  res.render("index.jade"); 
});

app.get("/send", function(req, res) {
  res.render("index.jade");
});

app.post("/send", function(req, res) {
  var message = req.body.message;
  var Pusher = require('pusher');
  var pusher = new Pusher({
	appId: '49360',
	key: '7fea0eabc0d01de77eff',
	secret: 'd949d2f154944bb5f112'
});

  pusher.trigger('test_channel', 'my_event', {
    "message": message
  });
  res.render('index',{success: 'Message sent!'});
  res.end();
});

http.createServer(app).listen(app.get('port'), function(){
  //console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/register',function(request, response){
  var name = request.param('name');
  var email = request.param('email');
  var pass = request.param('pass');
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('INSERT INTO users (name,username,password) values ('+name+','+email+','+pass+')', function(err, result) {
      done();
      if (err)
      { console.error(err); response.json(false); }
      else
      {   response.json(true); }
    });
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');
var path = require('path');

app.use(cors());
app.use('/', express.static(__dirname+'/'));
app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

var authCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://{YOUR-AUTH0-DOMAIN}.auth0.com/.well-known/jwks.json"
  }),
  audience: '{YOUR-AUTH0-API-IDENTIFIER}',
  issuer: "https://{YOUR-AUTH0-DOMAIN}.auth0.com/",
  algorithms: ['RS256']
});

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authCheck, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3000);
console.log('Listening on http://localhost:3000');

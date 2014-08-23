var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();

var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --

// boot scripts mount components like REST API
boot(app, __dirname);

var config = {};
try {
    config = require('../providers.json');
} catch(err) {
    console.error('Please configure your passport strategy in `providers.json`.');
    process.exit(1);
}

passportConfigurator.init();
passportConfigurator.setupModels({
    userModel: app.models.User,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.UserCredential
});

for(var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
}

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/auth/account', function(req, res, next) {
    console.log("HEERRRRRRRRRRRRRRREEE1");
    res.redirect('http://localhost:63342/strongloop/t2spare/trunk/client/www/index.html#/tab/dash');
});


app.use(loopback.static(path.join(__dirname, 'public')));

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
//   var path = require('path');
//   app.use(loopback.static(path.resolve(__dirname, '../client')));

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

var swaggerRemote = app.remotes().exports.swagger;
if (swaggerRemote) {
    swaggerRemote.requireToken = false;
}

app.enableAuth();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

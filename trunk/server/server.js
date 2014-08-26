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
app.use(loopback.cookieParser('246bace2-38cb-4138-85d9-0ae8160b07c8'));
app.use(loopback.token({model: app.models.AccessToken}));
app.use(loopback.bodyParser());
app.use(loopback.methodOverride());
app.use(loopback.session({ secret: 'keyboard cat' }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
});

for(var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
}

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

/*app.get(/^\/auth\/(\w+)(?:\.\.(\w+))?$/, function(req, res, next) {
    console.log("Heeeeeereee");
    console.log("User:"+JSON.stringify(req.user));
    //res.redirect('http://localhost:63342/strongloop/t2spare/trunk/client/www/index.html#/tab/dash');
    res.render('loginSuccess',{user: req.user});
    //res.send("authenticated!");
});*/

app.get('/auth/loginSuccess', function(req, res, next) {
    console.log("In auth/loginSuccess");
    var access_token = req.signedCookies.access_token;
    console.log("Access Token:"+access_token);
    //console.log("User:"+JSON.stringify(req.user));
    //res.redirect('http://localhost:63342/strongloop/t2spare/trunk/client/www/index.html#/tab/dash');
    //res.render('loginSuccess',{user: req.user});
    //res.redirect('?userId='+req.user.id);
    res.redirect("https://www.facebook.com/connect/blank.html?userId="+req.user.id+'&accessToken='+access_token);
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

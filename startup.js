const appconfig = require('./appconfig');
const defaultConfig = require('./helper/defaultConfigurationsHelper');
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(fileUpload());  
configPage(app);
configApi(app);
configDatabase();
startServer(app);

/**
 * Config page routes and dependencies
 * @param {*} app 
 */
function configPage(app) {  
  // Set default parser and engine used to render pages.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.set('view engine', 'ejs');

  // Set alias to resolve internal folders.
  app.use("/scripts", express.static(__dirname + "/node_modules/"));
  app.use("/assets", express.static(__dirname + "/views/assets"));

  // Set session-express params to use during page sessions.
  app.use(session({
    secret: appconfig.webSessionSecretKey,
    resave: true,
    saveUninitialized: true,
    maxAge: 3600000 * 24  // Expires in 24 hours
  }));

  // Add page controles to the pipeline.
  app.use('/', require('./controller-page'));
}

/**
 * Config api routes and dependencies.
 * @param {*} app 
 */
function configApi(app) {

  // Set default parser.
  app.use(bodyParser.json());

  // Config CORS and http Header.
  app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');

    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  // Middleware used to validate token received during requests
  // only routes started with /api/v1/* will be checked.
  // Any route out of that range will be public.
  app.all('/api/v1/*', [require('./engine/apiAuthMiddleware')]);

  // Set alias to resolve internal folders.
  app.use("/docs", express.static(__dirname + "/apidoc/"));
  app.get('/api', (req, res) => { res.render('pages/doc'); });

  // Add api controlers to the pipeline.
  app.use('/', require('./controller-api'));

  // 404 in case of route not found.
  app.use((req, res, next) => {
    defaultConfig.loadDefaultInformations(req,res);   
    res.render('pages/home', {
      data: req.session.user,
      msg: 'Not Found'
  });
  return;
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}

/**
 * Database configuration and connection.
 */
function configDatabase() {
  //mongoose.connect('mongodb://localhost:27017/bancoFrete', { useNewUrlParser: true });
  mongoose.connect(appconfig.database);
  mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
  mongoose.connection.once('open', function () {
    console.log('Database connected');
  });
}

/**
 * Start htto server.
 * @param {*} app 
 */
function startServer(app) {
  app.set('port', process.env.PORT || 3100);
  let server = app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + server.address().port);
  });
}
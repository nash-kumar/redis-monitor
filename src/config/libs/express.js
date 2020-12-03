const express = require('express');
const bodyParser = require('body-parser');
const glob = require('glob');
const validator = require('express-validation');
const cors = require('cors');
const helmet = require('helmet');
const error = require('./error');
const assets = require('../assets');


/**
 * Init - adding application variables to app object
 * @param {Object} app express app object
 * @param {Object} config config class with env properties & methods
 */
module.exports.initLocalVariables = (app, config) => {
    const { env, packageJson } = config;
    app.title = packageJson.name;
    app.env = env.env;
    app.port = env.port;
    app.server = env.apiUrl;
    app.version = packageJson.version;
    app.engines = packageJson.engines;
};

/**
* Init dependent middlewares to app object
* @param {Object} app express app object
* @param {Object} config config class with env properties & methods
*/

module.exports.initMiddlewares = (app, config) => {

    // parse body params and attache them to req.body
    app.use(bodyParser.json({ limit: '50mb' })); // parse application/json
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // parse application/x-www-form-urlencoded

    // secure apps by setting various HTTP headers
    app.use(helmet());

    // enable CORS - Cross Origin Resource Sharing
    app.use(cors());
}

/**
 * Init public static upload files
 * @param {Object} app express app object
 */
module.exports.initStaticFiles = (app) => {
    app.use('/public', express.static(`${process.cwd()}/public`));
};

/**
* Init all the models
* @param {Object} app express app object
*/
module.exports.initModels = () => {
    // Get all modules model files
    const modelFiles = glob.sync(`${process.cwd()}/${assets.models}`);
    // Load all model files
    // eslint-disable-next-line
    modelFiles.map(model => require(model));
};
/**
 * Initialize all app module routers from core v1 router
 * @param {Object} app express app object
 */
module.exports.initRouters = (app) => {
    // Initialize express router
    const router = express.Router();

    // module routers
    const moduleRouters = glob.sync(`${process.cwd()}/${assets.routers}`);
    // eslint-disable-next-line
    moduleRouters.map(moduleRouter => require(moduleRouter)(router, validator));

    // mount api v1 routes
    app.use('/api/v1', router);

    // api status route
    app.use('/status', (req, res) => res.send('{APP_NAME} running in {ENV} {DATE}'));

    // home route
    app.use('/', (req, res) => {
        // TODO: this might load with another landing page
        res.send({ name: 'Welcome', message: 'Welcome to Redis Monitor api endpoint!' });
    });

    // 404 error route
    app.use('*', (req, res) => {
        res.status(404).send({ name: 'Error', errors: [], message: 'You got a wrong url' });
    });
};

module.exports.successResponse = (app) => {
    app.use((req, res, next) => {
        res.send = (body) => {
            const resBody = {
                success: true,
                message: 'SUCCESS',
                status: res.statusCode,
                data: body,
            };
            res.end(JSON.stringify(resBody));
        };
        return next();
    });
};

/**
 * Initialize the app with middlewares
 *
 * @param {Object} config config class with env properties & methods
 * @return {Object} app express object
 */

module.exports.init = (config) => {
    try {
        // Initialize express app & other middlewares
        const app = express();

        // init some local variables
        this.initLocalVariables(app, config);

        // init static files
        this.initStaticFiles(app);

        // init models
        this.initModels();

        // init success handler
        this.successResponse(app);

        // init router
        this.initRouters(app);

        // init error handler
        this.initErrorHandler(app);

        return app;
    } catch (err) {
        console.log(err);
        return err;
    }
};

module.exports.listen = async (app, conn) => {
    try {
        if (conn) {
            const server = await app.listen(app.port, () => {
                console.info('--');
                console.info(app.title);
                console.info();
                console.info(`Environment:     ${app.env}`);
                console.info(`Server:          ${app.server}`);
                console.info(`Database:        ${app.dburi}`);
                console.info(`App version:     ${app.version}`);
                console.info(`Started At:      ${new Date()}`);
                console.info('--');
            });

            return server;
        }

        return process.exit(1);
    } catch (err) {
        console.log(err);
        return err;
    }
};
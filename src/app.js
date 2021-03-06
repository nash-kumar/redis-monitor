const config = require('./config');
const express = require('./config/libs/express');
const database = require('./config/libs/database');

/**
 * Start the application with express 
 */
module.exports.start = async () => {
  try {
    // Init express middlewares & error handlers & routers
    const app = await express.init(config);
    // express start & listen to server port
    // connect to database
    const conn = await database.connect();
    const server = await express.listen(app, conn);
    // return server
    return server;
  } catch (error) {
    return process.exit(1);
  }
};

/**
 * Stop the application with express 
 */
module.exports.stop = (server) => {
  try {
    // stop the express server instance
    server.close();
    // disconnect database 
    database.disconnect();
    // return
    return true;
  } catch (error) {
    return process.exit(1);
  }
};

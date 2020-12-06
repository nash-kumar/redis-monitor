const Sequelize = require("sequelize");
const { db } = require('../env');

module.exports.database = new Sequelize(
    db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});

module.exports.connect = async () => {
    try {
        await this.database.authenticate();
        await this.database.sync();
        return true;
    } catch (err) {
        console.log(`Database connection error: ${err}`);
        process.exit(-1);
    }
}

module.exports.disconnect = async () => {
    try {
        await database.close();
    } catch (err) {
        console.log(`Database connection error: ${err}`);
        process.exit(-1);
    }
}
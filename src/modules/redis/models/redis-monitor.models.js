module.exports = (sequelize, Sequelize) => {
    const RedisMonitorSchema = sequelize.define("RedisMonitor", {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        host: Sequelize.STRING,
        port: { type: Sequelize.INTEGER, defaultValue: 6379 },
        password: Sequelize.STRING,
        addedAt: Sequelize.DATE
    });
    return RedisMonitorSchema;
}
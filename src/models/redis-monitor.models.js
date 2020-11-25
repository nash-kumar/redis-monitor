module.exports =  (sequelize, Sequelize) => {
    const RedisMonitorSchema = sequelize.define("RedisMonitor", {
        md5: Sequelize.STRING,
        host: Sequelize.STRING,
        port: Sequelize.INTEGER,
    },{
        timestamps: true
    });
    return RedisMonitorSchema;
}
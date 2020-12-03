const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
require('dotenv').config();
const responseTime = require('response-time');
const StatsD = require('node-statsd');
const port = process.env.PORT || 8080;

const stats = new StatsD()
const models = require("./src/models");

const monitorRoute = require("./src/routes/redis-monitor.routes");

models.sequelize.sync().then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log(err);
})

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/redis', monitorRoute);
app.use(express.static("public"));

app.use(responseTime((req, res, time) => {
    let stat = (req.method + req.url).toLowerCase()
        .replace(/[:\.]/g, '')
        .replace(/\//g, '_')
    console.log('Time', stats.timing(stat, time));
}))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")))

app.listen(port, () => console.log("App listening on", port))
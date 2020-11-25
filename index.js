const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 8080;

const models = require("./src/models");

const monitorRoute = require("./src/routes/redis-monitor.routes");

models.sequelize.sync().then(() => {
    console.log('Connected to Database');
}).catch((err) => {
    console.log(err);
})

app.use('/redis', monitorRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('Initial route'))

app.listen(port, () => console.log("App listening on", port))
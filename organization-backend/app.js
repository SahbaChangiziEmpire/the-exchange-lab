const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const organizationRouter = require('./routes/organization');
const employeeRouter = require('./routes/employee');
const positionRouter = require('./routes/position');


dotenv.config();

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(bodyParser.json());
app.use(cors());

app.use('/api/organization', organizationRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/positions', positionRouter);


module.exports = app;

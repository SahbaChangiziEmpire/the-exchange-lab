const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const organizationRouter = require('./routes/organization');
const employeeRouter = require('./routes/employee');
const positionRouter = require('./routes/position');


dotenv.config();

const app = express();
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://34.125.241.148:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/api/organization', organizationRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/positions', positionRouter);


module.exports = app;

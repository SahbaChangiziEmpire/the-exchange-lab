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

// CORS configuration to allow requests from specific origin
const allowedOrigins = ['http://34.125.241.148:3000', 'localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use('/api/organization', organizationRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/positions', positionRouter);


module.exports = app;

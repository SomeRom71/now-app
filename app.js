require('dotenv').config();
const express = require("express");
const sequelize = require('./db');
const cors = require("cors");
const path = require("path");
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware.js')

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
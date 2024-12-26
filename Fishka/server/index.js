require("dotenv").config();

const fileUpload = require('express-fileupload')
const cookiePerser = require('cookie-parser')
const express = require("express");
const cors = require('cors')

const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const router = require('./route/index')
const model = require('./model/model')
const sequelize = require("./db");
const path = require('path')


const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // фронтенд
    credentials: true, // Разрешите отправку куки
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static'))) 
app.use(fileUpload({}))
app.use(cookiePerser())
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start()
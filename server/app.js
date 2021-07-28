const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

dotenv.config({ path: './config.env' });
require('./db/conn');

const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));

const port = process.env.PORT;



// .........................................................
// Middleware...
// const middleware = (req, res, next) => {
//     console.log("My middleware");
//     next();
// }


// app.get('/', (req, res) => {
//     res.send("Hello World from the server");
// });


// app.get('/about', middleware, (req, res) => {
//     res.send("Hello AboutUs from the server");
// });



// app.get('/contact', (req, res) => {
//     res.send("Hello ContactUs from the server");
// });

// .........................................................


app.get('/signin', (req, res) => {
    res.send("Hello SignIn  from the server");
});


app.get('/signup', (req, res) => {
    res.send("Hello SignUp from the server");
});


app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
});
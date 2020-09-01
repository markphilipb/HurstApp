require('dotenv').config();
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');

const adminController = require('./controllers/admin_controller');
const cloudinaryController = require('./controllers/cloudinary_controller');
const userController = require('./controllers/user_controller');
const productsController = require('./controllers/products_controller');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const PORT = 5000;
mongoose.connect(process.env.ATLAS_URI,
    { useNewUrlParser: true },
    (err) => {
    if(err) {
        console.log('Database Error----------------', err);
    }
    console.log('Connected to database');
});
//Middleware 
app.use(bodyParser.json());

//For storing cookies for the user.
app.use(session({

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));

//User endpoints 
setTimeout(() => {
    app.get('/api/upload', cloudinaryController.upload);
    //Read the user's session.
    app.get('/api/user-data', userController.readUserData);

    app.post('/api/user-data/cart', userController.addToCart);

    app.delete('/api/user-data/cart/:id', userController.removeFromCart);


    //When user login
    app.get('/auth/callback', userController.login)
    //NO NEED FOR A REGISTER SINCE YOUR ARE USING AUTH0.
    //Just need a login, since you are logging from your social media provider no need to register, only looks if a user already has a account.

    app.post('/api/logout', userController.logout);

    app.get('/api/products', productsController.readAllProducts);

    app.get('/api/products/:id', productsController.readProduct);

    //Admin Endpoints 
    app.get('/api/users', adminController.getAdminUsers);

    app.post('/api/products', adminController.createProduct);


    app.post('/api/users/createadmin', adminController.createAdmin);
    app.delete('/api/users/:id', adminController.deleteAdmin);


    app.put('/api/products/:id', adminController.updateProduct);

    app.delete('/api/products/:id', adminController.deleteProduct);

}, 200);

app.listen(PORT, () => console.log('Listening on Port:', PORT));



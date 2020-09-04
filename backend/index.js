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

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://hurstlimited.us.auth0.com/.well-known/jwks.json'
    }),
  
    audience: 'https://hurstapi/api',
    issuer: 'https://hurstlimited.us.auth0.com/',
    algorithms: ['RS256']
  });
//   app.use(checkJwt);
var options = {
    customScopeKey: 'permissions'
};
const checkScopes = jwtAuthz([ 'delete:product' ], options);
// const checkScopes = jwtAuthz([ 'delete:product' ]);
// const checkScopes = jwtAuthz([ 'update:product' ]);


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
// app.use(express.json());
// app.use(express.urlencoded());

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
    app.get('/api/users', checkJwt, checkScopes, adminController.getAdminUsers);

    app.post('/api/products', checkJwt, checkScopes, adminController.createProduct);


    app.post('/api/users/createadmin', checkJwt, checkScopes, adminController.createAdmin);
    app.delete('/api/users/:id', checkJwt, checkScopes, adminController.deleteAdmin);

    // app.put('/api/products/update/:id', userController.updateInventory);

    app.put('/api/products/:id', checkJwt, checkScopes, adminController.updateProduct);

    app.delete('/api/products/:id', checkJwt, checkScopes, adminController.deleteProduct);

    app.post("/api/create-checkout-session", async (req, res) => {
        const cartDetails = await req.body.cartDetails;
        console.log(req.body.itemId.cartItems);

        const session = await stripe.checkout.sessions.create({
          billing_address_collection: 'auto',
          shipping_address_collection: {
              allowed_countries: ['US', 'CA'],
          },
          payment_method_types: ["card"],
          line_items: cartDetails,
          mode: "payment",
          success_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cancel",
        });
      
        res.json({ id: session.id });
      });

}, 200);

app.listen(PORT, () => console.log('Listening on Port:', PORT));



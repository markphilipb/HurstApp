require('dotenv').config();
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');

const adminController = require('./controllers/admin_controller');
const cloudinaryController = require('./controllers/cloudinary_controller');
const userController = require('./controllers/user_controller');
const productsController = require('./controllers/products_controller');
const orderController = require('./controllers/order_controller');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


//stripe -------------------------------------------------------------------------

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);
const endpointSecret = 'whsec_qGLtYSZh7ibIK9Pi74AHs99LpjlsJPan';

const fulfillOrder = (session) => {
    // TODO: fill me in
    orderController.fulfillOrder(session);
    productsController.decreaseQuantity(session.metadata);
}

const createOrder = (session, lineItems) => {
    // TODO: fill me in
    orderController.createOrder(session, lineItems);
    
    // console.log("line items", lineItems.data[0].price);
}
  
const emailCustomerAboutFailedPayment = (session) => {
    // TODO: fill me in
    console.log("Emailing customer", session);
}


// Auth0 --------------------------------------------------------------------------

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

var options = {
    customScopeKey: 'permissions'
};

const checkScopes = jwtAuthz(['delete:product'], options);
// const checkScopes = jwtAuthz([ 'delete:product' ]);
// const checkScopes = jwtAuthz([ 'update:product' ]);


const PORT = 5000;
mongoose.connect(process.env.ATLAS_URI,
    { useNewUrlParser: true },
    (err) => {
        if (err) {
            console.log('Database Error----------------', err);
        }
        console.log('Connected to database');
    });


//Middleware 
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json());
app.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
  }))
app.use(cors());
// app.use('/api', orderRoutes);
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


    //Order Endpoints
    app.get('/api/orders', orderController.readAllOrders);

    app.get('/api/orders/:id', orderController.readOrder);

    app.delete('/api/orders/:id', checkJwt, checkScopes, orderController.deleteOrder);


    //Admin Endpoints 
    app.get('/api/users', checkJwt, checkScopes, adminController.getAdminUsers);

    app.post('/api/products', checkJwt, checkScopes, adminController.createProduct);


    app.post('/api/users/createadmin', checkJwt, checkScopes, adminController.createAdmin);
    app.delete('/api/users/:id', checkJwt, checkScopes, adminController.deleteAdmin);

    // app.put('/api/products/update/:id', userController.updateInventory);

    app.put('/api/products/:id', checkJwt, checkScopes, adminController.updateProduct);

    app.delete('/api/products/:id', checkJwt, checkScopes, adminController.deleteProduct);



    //Stripe Checkout Routes

    app.post("/api/create-checkout-session", async (req, res) => {
        const cartDetails = await req.body.cartDetails;
        console.log("cart items ", req.body.itemId.cartItems[0]);
        let ids = {};
        for(let i=0; i<req.body.itemId.cartItems.length; i++){
            const name = req.body.itemId.cartItems[i].name;
            const size = req.body.itemId.cartItems[i].size;
            const prodId = req.body.itemId.cartItems[i].product;
            ids[name] = prodId + "," + size;
        }

        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            payment_method_types: ["card"],
            line_items: cartDetails,
            metadata: ids,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
        console.log("session id: ", session.id);
        res.json({ id: session.id });
    });

    app.post('/stripe/webhook', (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
      
        try {
          event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
        }
        catch (err) {
          return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        switch (event.type) {
            case 'checkout.session.completed': {
              const session = event.data.object;
              // Save an order in your database, marked as 'awaiting payment'
              stripe.checkout.sessions.listLineItems(
                session.id,
                { limit: 5 },
                function(err, lineItems) {
                  // asynchronously called
                  createOrder(session, lineItems);
                // console.log(lineItems);

                }
              );
            //   createOrder(session);
        
              // Check if the order is paid (e.g., from a card payment)
              //
              // A delayed notification payment will have an `unpaid` status, as
              // you're still waiting for funds to be transferred from the customer's
              // account.
              if (session.payment_status === 'paid') {
                fulfillOrder(session);
              }
        
              break;
            }
        
            case 'checkout.session.async_payment_succeeded': {
              const session = event.data.object;
        
              // Fulfill the purchase...
              fulfillOrder(session);
        
              break;
            }
        
            case 'checkout.session.async_payment_failed': {
              const session = event.data.object;
        
              // Send an email to the customer asking them to retry their order
              emailCustomerAboutFailedPayment(session);
        
              break;
            }
        }
      
        // Return a 200 response to acknowledge receipt of the event
        res.json({received: true});
      })

}, 200);

app.listen(PORT, () => console.log('Listening on Port:', PORT));



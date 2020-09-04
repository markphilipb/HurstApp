const User = require('../models/user');
const Product = require('../models/product');

///import axios to do axios call .
const axios = require('axios');
module.exports = {
    // updateInventory(req, res) {
    //     const { id } = req.params;
    //     //Destruct the update data from the req.body,
    //     // also add picture to destruct from req.body ;------------------------------
    //     const { countInStock, countSmall, countMedium, countLarge, countXL } = req.body;
    //     //Find the product, and update it's properties
    //     Product.findById(id).exec((err, product) => {
    //         if(err) console.log('Updated Product-----------------', err);
    //         product.countInStock = countInStock - 1;
    //         product.countSmall = countSmall;
    //         product.countMedium = countMedium;
    //         product.countLarge = countLarge;
    //         product.countXL = countXL;
    //         //Save the product with updated data.
    //         product.save();
    //         //THen send back the data, just for testing purposes.
    //         res.status(200).json({product});
    //     })
    // }, 
    readUserData(req, res) {
      //Get the session, for update the reducer.
      res.status(200).json({user: req.session.user});  
    },
    addToCart(req, res){
    },
    removeFromCart(req, res) {

    },
    
    login(req, res) {
        //Now setup our auth post request to retrive accessTokenResposne. 
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
            code: req.query.code, 
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        }).then(accessTokenResponse => {
            //Get the data from the response. 
            const accessToken = accessTokenResponse.data.access_token;
            console.log(accessToken)
            //Now return a axios get retrieving the user information usiing the access token.
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`).then(userDataResponse => {
                //Destruct the  data from  from auth0
                const { name, email, sub } = userDataResponse.data;
                console.log('user data--------', userDataResponse.data);
                // res.status(200).json({message: 'mEssages'})
                User.findOne({auth0_id: sub}, (err, user) => {
                    if(err) console.log('Login Error--------------', err);

                    //If the user is undefined.
                    if(!user) { 
                        //Create a new user. 
                        let newUser = new User({
                            // name: name,
                            email: email,
                            auth0_id: sub,
                            //For now set it to true, then after you login set it to false, so other users are not considered the admin.
                            // is_admin: true 
                            isAdmin: false
                        });
                        //Assign the user to the session.
                        req.session.user = newUser;
                        //Save the session
                        req.session.save();
                        //Save the newUser instance to mongodb
                        newUser.save();
                    } 
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/');
                })
            }).catch(err => console.log('Auth0 get user info Error------------', err));
        }).catch(err => console.log('Auth0 Axios Post backend Error------------', err));
    },
    logout(req, res) {
        //Destroy the session, which logout the user, since when the user session is undefined the redux also logout's
        // the user in the frontend.
        req.session.destroy();
        //Send a message informing  a user successfully logged out.
        res.status(200).json({message: 'Logout Successfully!'});
    }
}
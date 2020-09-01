const Product = require('../models/product');
const User  = require('../models/user');
const { count } = require('../models/product');
module.exports = {
    getAdminUsers(req, res) {
        User.find().exec((err, users) => {
            if(err) console.log('Find Admin Users Error---------------', err);
            res.status(200).json({users});
        })
    }, 
    createProduct(req, res) {
        //Destruct the values sent in from frontend from req.body;
        //Now also destruct the picture also from the request body.--------------------
        const { name, description, price, picture, countInStock, countSmall, countMedium, countLarge, countXL } = req.body;
        //Have a new Product model instance set to a variable to be save to database.--------------------------
        let newProduct = new Product({
            name,
            description,
            price,
            //add picture property to the product model instance. -----------------------
            picture,
            countInStock,
            countSmall,
            countMedium,
            countLarge,
            countXL

        });
        //use the .save() to save model to database.
        newProduct.save();
        //Then send back the products.
        res.status(200).json({product: newProduct});
    }, 
    updateProduct(req, res) {
        const { id } = req.params;
        //Destruct the update data from the req.body,
        // also add picture to destruct from req.body ;------------------------------
        const { name, description, price, picture, countInStock, countSmall, countMedium, countLarge, countXL } = req.body;
        //Find the product, and update it's properties
        Product.findById(id).exec((err, product) => {
            if(err) console.log('Updated Product-----------------', err);
            product.name = name;
            product.description = description;
            product.price = price;
            //Also update picture. 
            product.picture = picture;
            product.countInStock = countInStock;
            product.countSmall = countSmall;
            product.countMedium = countMedium;
            product.countLarge = countLarge;
            product.countXL = countXL;
            //Save the product with updated data.
            product.save();
            //THen send back the data, just for testing purposes.
            res.status(200).json({product});
        })
    }, 
    deleteProduct(req, res) {
        //Destruct the id from the request params, since you have to delete a specific product.
        const { id } = req.params;
        //Use an object to delete the specified product.
        Product.deleteOne({_id: id}).exec((err, product) => {
            if(err) console.log('Delete One Error-----------------', err)
            res.status(200).json({product});
        });
    },
    createAdmin(req, res) {
        //Destruct the values sent in from frontend from req.body;
        //Now also destruct the picture also from the request body.--------------------
        const { name, email, password, isAdmin } = req.body;
        //Have a new Product model instance set to a variable to be save to database.--------------------------
        let newAdmin = new User({
            name,
            email,
            password,
            isAdmin,

        });
        //use the .save() to save model to database.
        newAdmin.save();
        //Then send back the products.
        res.status(200).json({admin: newAdmin});
    },
    deleteAdmin(req, res) {
        //Destruct the id from the request params, since you have to delete a specific product.
        const { id } = req.params;
        //Use an object to delete the specified product.
        User.deleteOne({_id: id}).exec((err, user) => {
            if(err) console.log('Delete One Error-----------------', err)
            res.status(200).json({user});
        });
    }, 
}
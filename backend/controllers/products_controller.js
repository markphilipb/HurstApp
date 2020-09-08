const mongoose = require('mongoose');
const Product  = require('../models/product');
const { db } = require('../models/product');
module.exports = {
    readAllProducts(req, res) {
        //When using mongoose can use a callback or a use a exec method to catch and respond to errors.
        Product.find({}).exec((err, products) => {
            if(err) console.log('Get Product Mongoose Error------------------', err);
            // console.log('products-------------', products);
            res.status(200).send(products);
        });
    },
    readProduct(req, res) {
        //Destruct the id from the endpoint url, to retrieve  a specific product.
        const { id } = req.params;
        //Copy and paste on of the product's id to the url when testing it.
        //Use the findById to get a specific product.
        Product.findById(id).exec((err, product) => {
            if(err) console.log('Get Single Product Error---------------', err);
            console.log('product--------------', product);
            res.status(200).json({product});
        })
    },
    decreaseQuantity(metadata) {
        console.log("metadata: ", metadata);
        Object.keys(metadata).map(function(key, index) {
            // return {
            //     updateOne: {
            //         filter: { _id: metadata[key] },
            //         update: { $inc: { countInStock: - } }
            //     }
            // }
            console.log("key: ", key);
            // Product.update({
            //     filter: { _id: metadata[key] },
            //     update: { $inc: { countInStock: -1 } }
            // })
            const sp = metadata[key].split(',');
            const id = sp[0];
            const itemSize = sp[1];

            Product.findById(id).exec((err, product) => {
                if(err) console.log('Updated Product-----------------', err);
                
                product.countInStock = product.countInStock - 1;

                if(itemSize == 'S'){
                    product.countSmall = product.countSmall - 1;
                }
                else if(itemSize == 'M'){
                    product.countMedium = product.countMedium - 1;
                }
                else if(itemSize == 'L'){
                    product.countLarge = product.countLarge - 1;
                }
                else if(itemSize == 'XL'){
                    product.countXL = product.countXL - 1;
                }
             
                //Save the product with updated data.
                product.save();
                //THen send back the data, just for testing purposes.
                // res.status(200).json({product});
            })
        });
    }
}

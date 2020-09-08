const Order = require('../models/order');


module.exports = {
    readAllOrders(req, res) {
        //When using mongoose can use a callback or a use a exec method to catch and respond to errors.
        Order.find({}).exec((err, order) => {
            if(err) console.log('Get Order Mongoose Error------------------', err);
            console.log('orders-------------', order);
            res.status(200).send(order);
        });
    },
    readOrder(req, res) {
        //Destruct the id from the endpoint url, to retrieve  a specific product.
        const { id } = req.params;
        //Copy and paste on of the product's id to the url when testing it.
        //Use the findById to get a specific product.
        Order.findById(id).exec((err, order) => {
            if(err) console.log('Get Single Order Error---------------', err);
            console.log('order--------------', order);
            res.status(200).json({order});
        })
    }, 
    createOrder(session, lineItems) {
        console.log("Shipping info", session.shipping);
        console.log("line items: ", lineItems);
        const items = lineItems.data;
        
        let itemsTotalPrice = 0;

        let cartItems = [];
        for(let i = 0; i < items.length; i++){ 
            const itemName = items[i].description;
            const itemPrice = items[i].amount_total;
            const itemQty = 1;
            const sp = session.metadata[itemName].split(',');
            const id = sp[0];
            const itemSize = sp[1];
            let newItem = {
                itemId: id,
                name: itemName,
                price: itemPrice,
                size: itemSize,
                qty: itemQty 
            }
            cartItems = [...cartItems, newItem];
            itemsTotalPrice = itemsTotalPrice + itemPrice;
            console.log("item id: ", newItem.itemId);
        }
        // const { orderItems, shipping, payment, itemsPrice, totalPrice } = req.body;
        // //Have a new Product model instance set to a variable to be save to database.--------------------------
        const shipping = {
            address: "line 1: " + session.shipping.address.line1 + "line 2: " + session.shipping.address.line2,
            city: session.shipping.address.city,
            postalCode: session.shipping.address.postal_code,
            country: session.shipping.address.country,
            state: session.shipping.address.state,
            name: session.shipping.name
        }
        let newOrder = new Order({
            orderItems: cartItems,
            shipping: shipping,
            payment: session.payment_method_types,
            itemsPrice: itemsTotalPrice,
            totalPrice: itemsTotalPrice,
            isPaid: session.payment_status
        });
        

        newOrder.save();
        // res.status(200).json({message: "New Order Created", data: newOrder});
    },
    fulfillOrder(session) {
        console.log("Fulfilling Order", session);
        // const { orderItems, shipping, payment, itemsPrice, totalPrice } = req.body;
        // //Have a new Product model instance set to a variable to be save to database.--------------------------
        // let newOrder = new Order({
        //     orderItems,
        //     shipping,
        //     payment,
        //     itemsPrice,
        //     totalPrice
        // });

        // newOrder.save();
        // res.status(200).json({message: "New Order Created", data: newOrder});
    }, 

    deleteOrder(req, res) {
        //Destruct the id from the request params, since you have to delete a specific product.
        const { id } = req.params;
        //Use an object to delete the specified product.
        Order.deleteOne({_id: id}).exec((err, order) => {
            if(err) console.log('Delete One Error-----------------', err)
            res.status(200).json({order});
        });
    }, 
    
    
}
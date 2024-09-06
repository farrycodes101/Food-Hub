import userModel from "../models/userModel.js";

// Add Item into Users Cart
const addToCart = async(req, res) => {
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[ req.body.itemId]){
           cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success : true, mesage : "Successfully Added To Cart"});
    }catch(error) {
        console.log(error);
        res.json({success: false, message : "Error"});
        
    }
}

// Remove Item from Users Cart
const removeFromcart = async(req, res) => {
    try {
        let userData = await userModel.findById( req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[ req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
         }
         await userModel.findByIdAndUpdate(req.body.userId, {cartData});
         res.json({success : true, mesage : "Successfully Removed From Cart"});
    }catch(error){
        console.log(error);
        res.json({success: false, message : "Error"});
    }
}

// Fetch Users Cart Data
const getCart = async(req, res) => {
    try {
        let userData = await userModel.findById( req.body.userId);
        let cartData = await userData.cartData;
         res.json({success : true, cartData});
    }catch(error){
        console.log(error);
        res.json({success: false, message : "Error"});
    }
}

export { addToCart, removeFromcart, getCart };

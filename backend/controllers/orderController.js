import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_Key}`);

// Placing User Order from Frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_item = req.body.items.map((item) => ({
            price_data: {
                Currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity : item.quantity
        }))

        line_item.push({
            price_data : {
                Currency : "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            line_item : line_item,
            mode : "payment",
            success_url : `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success : true, session_url : session.url});

    } catch (error) {
        console.log(error);
        res.json({success : false, message : "Error"});
        
    }
}

const verifyOrder = async(req, res) => {
    const { orderId, success } = req.body
    try {
        if(success===true){
            await orderModel.findByIdAndUpdate(orderId,{payment : true});
            res.json({success : true, message : "Payment Successful"})
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success : false, message : "Payment Unsuccessful"});
        }
    }catch(error){
        console.log(error);
        res.json({success : false, message : "Error"});
    }
}

// Users Order For Frontend
const userOrders =  async(req, res) => {
    try{
        const orders = await orderModel.find({userId : req.body.userId});
        res.json({success : true, data : orders});
    }catch(error){
        console.log("Error");
        res.json({success : false, message : "Error"});
        
    }
}

// Listing Orders For Admin Panel
const listOrders = async (req, res) =>{
    try{
        const orders = await orderModel.find({});
        res.json({success : true, data : orders})
    }catch(error){
        console.log("Error");
        res.json({success : false, message : "Error"})
        
    }
}


// API For Updating Order Status
const updateStatus = async (req, res) =>{
    try{
        const orders = await orderModel.findByIdAndUpdate(req.body.orderId,{status : req.body.status});
        res.json({success : true, message : "Status Updated"})
    }catch(error){
        console.log("Error");
        res.json({success : false, message : "Error"})
        
    }
}
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
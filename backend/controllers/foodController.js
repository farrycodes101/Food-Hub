import foodModel from "../models/foodModel.js";
import fs from 'fs'

// Add Food Items
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: 'Food Item Added Successfully' })
    } catch (error) {
        res.json({ success: false, message: 'Error Occured !' })
    }
}

// Add Food List
const listFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        res.json({ success: true, data: food })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error Occured !' })
    }
}

// Remove Food Item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Food Deleted Successfully !' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error Occured !' })
    }
}

export { listFood, removeFood };












export { addFood };
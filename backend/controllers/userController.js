import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ success: false, message: 'User Does not Exists' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }
        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });
    }
}

// To Create Token
const createToken = (id) => {
    return jwt.sign({ id }, `${process.env.JWT_SECRET}`);
}

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // To Check If User already Exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User Already Exists' })
        }
        // To validate Email & Strong Password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please Enter Valid Email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please Enter a Strong Password' })
        }
        //Hashing User & Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // New User
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" });

    }
}

export { loginUser, registerUser, createToken };
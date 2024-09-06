import express from 'express';
import { addToCart, removeFromcart, getCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';

const cartRouter = express.Router();

// EndPoints
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromcart);
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
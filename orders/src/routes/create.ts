import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { NotFoundError } from "@sahhhallecom/common";
import { Product } from "../models/product";


const router = express.Router();

router.post("/order", async (req: Request, res: Response) => {
    const { productId } = req.body;
    // for now just assume user id 
    const userId = "123"

    const product = await Product.findById(productId);
    if (!product) {
        throw new NotFoundError();
    }
    const order = Order.build({
        userId,
        product
    });
    await order.save();

    res.status(201).send(order)
})

export { router as createOrder }
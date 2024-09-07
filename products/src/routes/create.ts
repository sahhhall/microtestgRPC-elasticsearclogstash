import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Product } from "../models/product";
import { validateRequest } from "@sahhhallecom/common";
import { sendMessage } from "../utill/kafka-producer";


const router = express.Router();

router.post("/", [
    body('name').not().isEmpty().withMessage("name shoudl be filled"),
    body('price').isFloat({
        gt: 0
    }).withMessage("price must me greater than 0"),
    body('quantity').not().isEmpty().withMessage('quantity shouldnt be emoty'),
], validateRequest, async (req: Request, res: Response) => {
    const { name, price, quantity } = req.body;
    const product = Product.build({
        name,
        price,
        quantity
    });
    await product.save();
    await sendMessage('product-created', {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
    });

    res.status(201).send(product)
})

export { router as createProduct }
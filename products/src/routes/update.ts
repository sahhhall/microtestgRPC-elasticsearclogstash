import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Product } from "../models/product";
import { NotFoundError, validateRequest } from "@sahhhallecom/common";
import { sendMessage } from "../utill/kafka-producer";


const router = express();


router.put("/", [
    body('id').not().isEmpty().withMessage("Product ID should be provided"),
    body('name').optional().not().isEmpty().withMessage("Name should be provided"),
    body('price').optional().isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
    body('quantity').optional().not().isEmpty().withMessage('Quantity should not be empty'),
], validateRequest, async (req: Request, res: Response) => {
    const { id, name, price, quantity } = req.body;

    const product = await Product.findById(id);
    if (!product) {
        throw new NotFoundError();
    }

    if (name) {
        product.name = name;
    }
    if (price) {
        product.price = price;
    }
    if (quantity) {
        product.quantity = quantity;
    }

    await product.save();
    console.log(product)
    await sendMessage('product-updated', {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
    });

    res.status(200).send(product);
});

export { router as updateRouter };
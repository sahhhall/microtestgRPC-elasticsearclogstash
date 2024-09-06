
import express, { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';


const router = express.Router();

router.get("/products", async (req: Request, res: Response) => {
    const product =  await Product.find({
        orderId:undefined
    });
    res.send(product)
});


export { router as getAllProducts }
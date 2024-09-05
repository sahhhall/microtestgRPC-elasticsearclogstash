
import express, { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';


const router = express.Router();

router.get("/products", async (req: Request, res: Response) => {
    const tickets =  await Product.find({
        orderId:undefined
    });
    res.send(tickets)
});


export { router as getAllProducts }
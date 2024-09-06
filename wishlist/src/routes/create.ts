import express, { Request, Response } from 'express';
import { Wishlist } from '../models/wishlist';
import { Product } from '../models/product';
import { NotFoundError } from '@sahhhallecom/common';

const router = express.Router();


router.post('/wishlist', async (req: any, res: Response) => {
    const { productId } = req.body;
    const { id } = req.user ;
    const product = await Product.findById(productId);

    if (!product) {
        throw new NotFoundError();
    }


    let wishlist = await Wishlist.findOne({ id });

    if (!wishlist) {
        wishlist = Wishlist.build({ userId: id, products: [product] });
    } else {
        if (!wishlist.products.some((p) => p.equals(product.id))) {
            wishlist.products.push(product);
        }
    }

    await wishlist.save();

    res.status(201).send(wishlist);
});
import express, { Request, Response } from 'express';
import { Wishlist } from '../models/wishlist';
import { Product } from '../models/product';
import { NotFoundError } from '@sahhhallecom/common';

const router = express.Router();
router.get('/wishlist', async (req: any, res: Response) => {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ userId }).populate('products');

    if (!wishlist) {
        throw new NotFoundError()
    }
    res.status(201).send(wishlist);
});


export { router as wishlistShow }
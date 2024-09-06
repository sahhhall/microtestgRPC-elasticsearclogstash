import mongoose from "mongoose";
import { ProductDoc } from "./product";

interface WishlistAttrs {
    userId: string;
    products: ProductDoc[];
}


interface WishlistDoc extends mongoose.Document {
    userId: string;
    products: ProductDoc[];
}


interface WishlistModel extends mongoose.Model<WishlistDoc> {
    build(attrs: WishlistAttrs): WishlistDoc;
}


const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);


wishlistSchema.statics.build = (attrs: WishlistAttrs) => {
    return new Wishlist(attrs);
};

const Wishlist = mongoose.model<WishlistDoc, WishlistModel>("Wishlist", wishlistSchema);

export { Wishlist };

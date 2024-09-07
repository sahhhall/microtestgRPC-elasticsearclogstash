import mongoose from 'mongoose';

// data required to create a new document 
interface ProductAttr {
    name: string;
    price: number;
    quantity: number;
    id: string;
}

// prorperties availabale in existring document
export interface ProductDoc extends mongoose.Document {
    name: string;
    price: number;
    quantity: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttr): ProductDoc;
}


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
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

productSchema.statics.build = (atts: ProductAttr) => {
    return new Product({
        name: atts.name,
        price: atts.price,
        quantity: atts.quantity,
        _id: atts.id
    });
}


const Product = mongoose.model<ProductDoc, ProductModel>("Product", productSchema);

export { Product };
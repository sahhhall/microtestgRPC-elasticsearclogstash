import { Product } from "../../models/product";

export async function consumeupdatedEvent(consumer: any) {
    await consumer.subscribe('product-updated', async (data: any) => {

        const existingProduct = await Product.findById(data.id);

        if (existingProduct) {
            existingProduct.name = data.name || existingProduct.name;
            existingProduct.price = data.price || existingProduct.price;
            existingProduct.quantity = data.quantity || existingProduct.quantity;

            await existingProduct.save();
        } else {
            let newProduct = Product.build({
                name: data.name,
                price: data.price,
                quantity: data.quantity,
                id: data.id
            });

            await newProduct.save();
        }
    });
}

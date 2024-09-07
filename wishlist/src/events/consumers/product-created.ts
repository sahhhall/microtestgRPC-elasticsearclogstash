import { Product } from "../../models/product"

export async function consumeEvent(consumer: any) {
    await consumer.subscribe('product-created', async (data: any) => {
        console.log(data)
        let product = Product.build({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            id: data.id
        })
        await product.save()
    })
}
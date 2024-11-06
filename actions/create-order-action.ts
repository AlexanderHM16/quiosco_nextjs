"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

export async function CreateOrder(data: unknown){
    const result = OrderSchema.safeParse(data);
    if(!result.success){
        return {
            errors: result.error.issues
        }; 
    }
    try {
        await prisma.order.create({
            data:{
                name: result.data.name,
                totalPrice: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}
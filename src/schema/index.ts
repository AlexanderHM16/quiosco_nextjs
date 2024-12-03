import { z } from 'zod'

export const OrderSchema = z.object({
    name: z.string().min(1, "Tu nombre es obligatorio"),
    total: z.number().min(1, "Error al procesar la orden"),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((value) => parseInt(value))
        .refine(value => value > 0, {message: "Hay errores"})
});

export const SearchSchema = z.object({
    search: z.string().trim().min(1, {message: "Se debe introducir al menos un parámetro de búsqueda"}),
});

export const ProductSchema = z.object({
    name: z.string()
    .trim()
    .min(1,{message: "Se debe introducir el nombre del producto"}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, {message: "Se debe introducir un precio y ser mayor a 0"})
        .or(z.number().min(1, {message: 'El precio es obligatorio' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, {message: "Se debe introducir un ID de categoría"})
        .or(z.number().min(1, {message: 'La categoría es obligatoria' })),
    image: z.string().min(1, {message: "Es necesario un archivo de imagen"})
})
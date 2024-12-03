'use client';
import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton";

type ProductProps = {
    product: Product
  
}

export default function ProductCard({product}: ProductProps) {
    const imagePath = getImagePath(product.image);
  return (
    <div className="border bg-white">
        <Image
            width={400}
            height={500}
            src={imagePath}
            alt={`Imagen_platillo_${product.name}`}     
            className="border-solid border-2"  
        />
        <div className="p-5 ">
            <h4 className="text-1xl font-bold">
                {product.name}
            </h4>
            <p className="mt-5 font-black text-4xl text-amber-500">
                { formatCurrency(product.price)}
            </p>
            <AddProductButton
                product={product}
            />
        </div>
    </div>
  )
}

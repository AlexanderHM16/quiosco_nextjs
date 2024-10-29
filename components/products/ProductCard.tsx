import { Product } from "@prisma/client"

type ProductProps = {
    product: Product
  
}

export default function ProductCard({product}: ProductProps) {
  return (
    <div className="border bg-white">
        <div className="p-5">
            <h3 className="text-2xl font-bold">
                {product.name}
            </h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {product.price}
            </p>
        </div>
    </div>
  )
}

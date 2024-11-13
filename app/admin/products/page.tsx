import ProductPagination from "@/components/products/ProductPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

async function productCount(){
  return await prisma.product.count();
}
async function getProducts(page: number, pageSize:number){
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  });
  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({searchParams}:{searchParams:{page:string}}) {
  const params = await searchParams;
  const page = +params.page || 1;
  const pageSize = 12;
  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();
  const [ products, totalProducts ] = await Promise.all([productsData, totalProductsData]);
  const totalPages = Math.ceil(totalProducts / pageSize);
  if(page < 0){
    redirect('/admin/products')
  }
  return (
    <>
      <Heading>
        Administrar productos
      </Heading>
      <ProductTable
        products={products}
      />
      <ProductPagination 
      page={page}
      totalPages={totalPages}
      />
    </>
  )
}

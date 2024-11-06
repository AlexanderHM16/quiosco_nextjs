'use client';
import { useStore } from '@/src/store'
import ProductDetails from './ProductDetails';
import { useMemo } from 'react';
import { formatCurrency } from '@/src/utils';
import { CreateOrder } from '@/actions/create-order-action';
import { OrderSchema } from '@/src/schema';
import { toast } from 'react-toastify';

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      })
      return;
    }
    
    const response = await CreateOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      })
    }

    toast.success('Pedido realizado correctamente');
    clearOrder();
  }
  return (
    <aside className='lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5'>
        <h1 className="text-4xl text-center font-black">
            Mi Pedido 
        </h1>
        {order.length === 0 ? <p className="text-center my-10">El carrito está vacio</p> : (
          <div className="mt-5">
            <p className="text-2xl mt-6 text-center">
              Total: {''}
              <span className="font-bold">
                {formatCurrency(total)}
              </span>
            </p>
            <form action={handleCreateOrder} className="w-full mt-5 space-y-5 mb-7">
              <input 
              type="text" 
              placeholder='Tu nombre'
              className="bg-white border border-gray-100 p-2 w-full" 
              name="name"
              />
              <input 
              type="submit" 
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold" 
              value='Confirmar pedido'
              />
            </form>
            {order.map(item => (
              <ProductDetails 
                key={item.id}
                item={item}
              />
            ))} 
          </div>
        )}
    </aside>
  )
}

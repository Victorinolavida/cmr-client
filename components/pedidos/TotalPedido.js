import React, { useContext } from 'react'
import { PedidoContext } from '../../context/pedido/PedidioContext'

export const TotalPedido = () => {
  const { total } = useContext(PedidoContext)

  return (
    <div className='flex items-center mt-5 justify-between p-3 bg-white'>
      <h2 className='text-gray-800 text-lg'>Total a pagar</h2>
      <p className='text-gray-800 mt-0'>$ {total}</p>
    </div>
  )
}

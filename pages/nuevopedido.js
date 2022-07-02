import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import Layout from '../components/Layout'
import { AsignarCliente } from '../components/pedidos/AsignarCliente'
import { AsignarProducto } from '../components/pedidos/AsignarProductos'
import { ResumenPedido } from '../components/pedidos/ResumenPedido'
import { TotalPedido } from '../components/pedidos/TotalPedido'
import { PedidoContext } from '../context/pedido/PedidioContext'
import { GET_PEDIDOS } from './pedidos'



const NEW_PEDIDO = gql`
mutation newPedido($input: inputPedido!){
  newPedido(input: $input) {
    id
  }
}
`

const Nuevopedido = () => {

  const router = useRouter()
  const { client, products, total } = useContext(PedidoContext)

  const [newPedido] = useMutation(NEW_PEDIDO, {
    refetchQueries: [
      {
        query: GET_PEDIDOS
      }
    ]
  })

  const validarPedido = () => {
    const existClient = !(client.length === 0)//false
    const existProducts = products.every(p => p.cantidad > 0) && products.length !== 0
    const totalIsNotZero = total > 0
    return existClient && existProducts && totalIsNotZero;
  }

  const createPedido = async () => {
    try {
      const pedido = products.map(product => ({ id: product.id, cantidad: product.cantidad, nombre: product.nombre, precio: product.precio }))

      const { data } = await newPedido({
        variables: {
          input: {
            client: client.id,
            total,
            pedido,
            estado: 'PENDIENTE'
          }
        }
      })
      router.push('/pedidos')
      Swal.fire('Pedido', 'Pedido creado correctamente', 'success');

    } catch (error) {
      Swal.fire('Error', error.message, 'error');
      console.log(JSON.stringify(error, null, 2));

    }
  }

  return (
    <Layout>
      <h1 className='text-2xl text-grey-800 font-light'>Crear Nuevo Pedido</h1>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <AsignarCliente />
          <AsignarProducto />
          <ResumenPedido />
          <TotalPedido />

          <button className={`bg-gray-800 w-full text-white uppercase font-bold hover:bg-gray-900 mt-5 p-2 ${validarPedido() ? '' : 'opacity-50 cursor-not-allowed'} `}
            onClick={createPedido}
          >
            Registrar pedido
          </button>

        </div>
      </div>


    </Layout>
  )
}

export default Nuevopedido
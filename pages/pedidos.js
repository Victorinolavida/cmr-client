import React from 'react'
import Layout from '../components/Layout';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import { Pedido } from '../components/pedidos/Pedido';


export const GET_PEDIDOS = gql`
  query getPedidosBySeller{
    getPedidosBySeller {
    id
    total
    estado
    client {
      apellido
      nombre
      email
      telefono
      id
    }
    pedido {
      id
      nombre
      precio
      cantidad
      }
    }
  }`

const Pedidos = () => {
  const { data, loading } = useQuery(GET_PEDIDOS, { fetchPolicy: 'network-only' });


  if (loading) return <h1>cargando</h1>

  const { getPedidosBySeller } = data;


  return (
    <Layout>
      <h1 className='text-2xl text-grey-800 font-light'>Pedidos</h1>

      <Link href='/nuevopedido'>
        <a className='bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold'
        >Nuevo Pedido</a></Link>

      {
        getPedidosBySeller.length === 0
          ? (<p className='mt-5 text-center text-2xl'>No hay pedidos aun</p>)
          : (
            getPedidosBySeller.map(pedido => (
              <Pedido pedido={pedido} key={pedido.id} />
            ))

          )
      }

    </Layout>

  )
}

export default Pedidos
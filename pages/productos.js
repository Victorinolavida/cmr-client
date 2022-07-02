import Link from 'next/link'
import React from 'react'
import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { ProductsList } from '../components/ProductsList'

export const GET_PRODUCTS = gql`
query getProducts{
  getProducts {
    creado
    existencias
    id
    nombre
    precio
  }
}
`

const Productos = () => {

  const { data, loading } = useQuery(GET_PRODUCTS)


  if (!data || loading) return <h3>Cargando</h3>
  console.log(data)

  return (
    <Layout>
      <h1 className='text-2xl text-grey-800 font-light'>Productos</h1>


      <Link href='/nuevoproducto'>
        <a className='bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold'
        >Nuevo Producto</a></Link>

      <table className='table-auto shadow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Existencias</th>
            <th className="w-1/5 py-2">Precio</th>
            <th className="w-1/5 py-2">Eliminar</th>
            <th className="w-1/5 py-2">Editar</th>

          </tr>
        </thead>
        <tbody className='bg-white'>
          {
            data.getProducts.map(el => <ProductsList key={el.id} product={el} />)
          }
        </tbody>

      </table>
    </Layout>

  )
}

export default Productos
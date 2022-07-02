import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Client } from '../components/Client'

export const GET_CLIENT_SELLER = gql`
  query getClientsBySeller{
    getClientsBySeller {
      id
      apellido
      nombre
      creado
      email
      empresa
      id
    }
  }`

const Home = () => {

  const { data, loading } = useQuery(GET_CLIENT_SELLER)

  const router = useRouter()


  useEffect(() => {
    if (!localStorage.getItem('token-CRM')) {
      router.push('/login')
    }
  }, [router])


  if (loading) return null;

  return (
    <Layout>
      <h1 className='text-2xl text-grey-800 font-light'>Clientes</h1>

      <Link href='/nuevocliente'>
        <a className='bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 uppercase font-bold'
        >Nuevo Cliente</a></Link>

      <table className='table-auto shadow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2">Eliminar</th>
            <th className="w-1/5 py-2">Editar</th>

          </tr>
        </thead>
        <tbody className='bg-white'>
          {
            data.getClientsBySeller.map(client => (
              <Client key={client.id} client={client} />
            ))
          }

        </tbody>

      </table>
    </Layout>

  )
}

export default Home
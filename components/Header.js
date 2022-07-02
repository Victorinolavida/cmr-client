import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const GET_USER = gql`
  query getUser{
    getUser {
      apellido
      email
      nombre
    }
  }
`

export const Header = () => {
  const { data, loading } = useQuery(GET_USER)
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem('token-CRM')
    router.push('/login')
  }

  if (loading) return null;

  if (!data) {
    return router.push('/login')
  }

  const { nombre, apellido } = data.getUser;



  return (
    <div className='flex justify-between mb-6'>
      <p className='mr-2'>Bienvenido: <strong>{nombre} {apellido}</strong></p>

      <button
        onClick={logout}
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded
        py-1 px-2 text-white shadow-md '
      >
        Cerrar sesión
      </button>
    </div>
  )
}

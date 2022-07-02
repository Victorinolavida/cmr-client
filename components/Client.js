import React from 'react';
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router';

const DELETE_CLIENT = gql`
  mutation deleteClient($deleteClientId: ID!) {
    deleteClient(id: $deleteClientId)
  }
`

const GET_CLIENT_SELLER = gql`
  query getClientsBySeller{
    getClientsBySeller {
      id
      apellido
      nombre
      creado
      email
      empresa
    }
  }`

export const Client = ({ client }) => {



  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [
      {
        query: GET_CLIENT_SELLER
      }
    ]
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Deseas eliminar a este cliente?',
      text: "Esta accion no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          const { data } = await deleteClient({
            variables: {
              deleteClientId: id
            }
          })


          Swal.fire(
            'Cliente eliminado',
            data.deleteClient,
            'success'
          )
        } catch (error) {
          console.log(JSON.stringify(error, null, 2));
        }


      }
    })
  }


  const editarCliente = () => {

    Router.push({
      pathname: '/editarcliente/[id]',
      query: { id }

    })

  }

  const { nombre, apellido, email, empresa, id } = client;
  return (
    <tr>
      <td className='border px-4 py-2'>
        {nombre} {apellido}
      </td>
      <td className='border px-4 py-2'>
        {empresa}
      </td>
      <td className='border px-4 py-2'>
        {email}
      </td>
      <td className='border px-4 py-2'>
        <button
          className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded font-bold text-xs uppercase hover:bg-red-600'
          onClick={() => handleDelete(id)}
        >
          Eliminar
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </td>
      <td className='border px-4 py-2'>
        <button
          className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded font-bold text-xs uppercase hover:bg-green-800'
          onClick={() => editarCliente()}
        >
          Editar
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </button>
      </td>
    </tr >
  )
}

import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'
import React from 'react'
import Swal from 'sweetalert2'
import { GET_PRODUCTS } from '../pages/productos'

const DELETE_PRODUCT = gql`
  mutation deleteProduct($deleteProductId: ID!){
    deleteProduct(id: $deleteProductId)
  }
`


export const ProductsList = ({ product }) => {

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [
      {
        query: GET_PRODUCTS
      }
    ]
  })

  const handleDelete = () => {
    Swal.fire({
      title: '¿Deseas eliminar este producto?',
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

          const { data } = await deleteProduct({
            variables: {
              deleteProductId: product.id
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


  const editarProduto = () => {
    const { id } = product;
    Router.push({
      pathname: '/editarproducto/[id]',
      query: { id }

    })
  }

  return (
    <tr>
      <td className='border px-4 py-2'>{product.nombre}</td>
      <td className='border px-4 py-2'>{product.existencias} piezas</td>
      <td className='border px-4 py-2'>${product.precio}</td>
      <td className='border px-4 py-2'>
        <button
          className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded font-bold text-xs uppercase hover:bg-red-600'
          onClick={() => handleDelete()}
        >
          Eliminar
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </td>
      <td className='border px-4 py-2'>
        <button
          className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded font-bold text-xs uppercase hover:bg-green-800'
          onClick={() => editarProduto()}
        >
          Editar
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </button>
      </td>
    </tr>

  )
}

import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { GET_PEDIDOS } from '../../pages/pedidos';
import Swal from 'sweetalert2';

const UPDATE_PEDIDO = gql`
mutation  updatePedido($updatePedidoId: ID!, $input: inputPedido!){
  updatePedido(id: $updatePedidoId, input: $input) {
    estado
  }
}
`
const DELETE_PEDIDO = gql`
mutation deletePedido($deletePedidoId: ID!){
  deletePedido(id: $deletePedidoId)
}
`

export const Pedido = ({ pedido }) => {


  const { client, estado, total, cantidad } = pedido;
  const [state, setState] = useState(estado)
  const [clase, setClase] = useState('')

  const [updatePedido] = useMutation(UPDATE_PEDIDO, {
    refetchQueries: [
      {
        query: GET_PEDIDOS
      }
    ]
  })

  const [deletePedido] = useMutation(DELETE_PEDIDO, {
    refetchQueries: [
      {
        query: GET_PEDIDOS
      }
    ]
  })


  useEffect(() => {

    if (estado) {
      setState(estado)
    }
    handleChange()

  }, [estado])

  //modifica el color del pedido con respecto al estado
  const handleChange = () => {
    if (estado === 'PENDIENTE') {
      setClase('border-yellow-500')
    } else if (estado === 'COMPLETADO') {
      setClase('border-green-500')
    } else {
      setClase('border-red-800')
    }
  }

  const changeStatePedido = async (state) => {
    try {
      const { data } = await updatePedido({
        variables: {
          updatePedidoId: pedido.id,
          input: {
            client: client.id,
            estado: state
          }
        }
      })
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));

    }
  }

  const deletePedidoFunction = async (id) => {


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

          await deletePedido({
            variables: {
              deletePedidoId: id
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

  return (
    <div className={`${clase} border-t-4  mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
      <div className="">
        <p className='font-bold  text-gray-800'>Cliente:{client.nombre} {client.apellido}</p>

        {
          client.email && (
            <p className='flex items-center my-2'>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              {client.email}
            </p>)

        }

        {/* <p>{JSON.stringify(pedido)}</p> */}
        {
          client.telefono && (
            <p className='flex items-center my-2'>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {client.telefono}
            </p>)
        }

        <h2 className='text-gray-800 mt-10 font-bold'>Estado Pedido</h2>
        <select
          className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-500 focus:border-blue-500 uppercase text-xs font-bold'
          defaultValue={state}
          onChange={e => changeStatePedido(e.target.value)}
        >
          <option value={'PENDIENTE'}>PENDIENTE</option>
          <option value={'COMPLETADO'}>COMPLETADO</option>
          <option value={'CANCELADO'}>CANCELADO</option>
        </select>
      </div>

      <div className="">
        <h2 className='text-gray-800 font-bold mt-2'>Resumen del Pedido</h2>
        {pedido.pedido.map(art => (
          <div key={art.id} className='mt-4'>
            <p className="text-sm text-gray-600">Producto: {art.nombre}</p>
            <p className="text-sm text-gray-600">Cantidad: {art.cantidad}</p>

          </div>
        ))}
        <p className='text-gray-800 mt-3 font-bold'>
          Total a pagar:
          <span className='font-light'> ${total}</span>
        </p>
        <button className='flex items-center mt-4 bg-red-800 px-5 py-2 text-white rounded leading-light uppercase text-xs font-bold'
          onClick={() => deletePedidoFunction(pedido.id)}
        >
          Eliminar Pedido
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </div>
    </div>

  )
}

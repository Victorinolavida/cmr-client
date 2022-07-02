import { useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { PedidoContext } from '../../context/pedido/PedidioContext'
import { GET_CLIENT_SELLER } from '../../pages'



export const AsignarCliente = () => {

  const { data, loading } = useQuery(GET_CLIENT_SELLER);


  const [client, setClient] = useState([])

  const { addClient } = useContext(PedidoContext)

  useEffect(() => {

    addClient(client)

  }, [client])


  const selectClient = (client) => {
    setClient(client)
  }


  if (loading) return null;

  const { getClientsBySeller } = data;

  return (
    <>
      <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold'
      >1.- Asigna un cliente al pedido</p>
      <Select
        className='mt-3'
        options={getClientsBySeller}
        onChange={selectClient}
        getOptionLabel={op => op.nombre}
        placeholder='Seleccione el clientes'
        noOptionsMessage={() => 'No se encontro ese cliente'}
        getOptionValue={op => op.id}
      />

    </>
  )
}

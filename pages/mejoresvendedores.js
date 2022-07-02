import React, { useEffect } from 'react'
import Layout from '../components/Layout';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';

const TOP_SELLERS = gql`
query TopSellers {
  TopSellers {
    seller {
      _id
      apellido
      nombre
      email
    }
    total
  }
}
`

const Mejoresvendedores = () => {

  const { data, loading, startPolling, stopPolling } = useQuery(TOP_SELLERS);

  useEffect(() => {

    // consulta la base de datos cada segundo , pero solo si hay un cambio en la base
    startPolling(1000);

    //deteine la consulta cada segundo
    return () => stopPolling()

  }, [startPolling, stopPolling])

  if (loading) return <h2>Cargando...</h2>


  const { TopSellers } = data;

  const sellerChart = [];

  TopSellers.map((seller, index) => {
    sellerChart[index] = {
      ...seller.seller[0],
      total: seller.total
    }
  })



  return (
    <Layout>
      <h1 className='text-2xl text-grey-800 font-light'>Mejores vendedores</h1>

      <ResponsiveContainer width="100%" height="50%">
        <BarChart
          className='mt-10'
          width={500}
          height={300}
          data={sellerChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  )
}

export default Mejoresvendedores
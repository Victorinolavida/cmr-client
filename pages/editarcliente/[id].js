import Router, { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const GET_CLIENT = gql`
  query getClient($getClientId: ID!){
    getClient(id: $getClientId) {
      id
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`

const EDIT_CLIENT = gql`
mutation updateClient($updateClientId: ID!, $input: ClientInput!){updateClient(id: $updateClientId, input: $input) {
  email
}}
`


const EditarCliente = () => {
  const { query: { id } } = useRouter();
  const router = useRouter();


  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      getClientId: id
    }
  })


  const [updateClient] = useMutation(EDIT_CLIENT)

  //Schema de validacion
  const validationSchema = new Yup.ObjectSchema({
    nombre: Yup.string().required('El nombre del cliente es obligatorio'),
    apellido: Yup.string().required('El apellido del cliente es obligatorio'),
    empresa: Yup.string().required('La empresa del cliente es obligatorio'),
    email: Yup.string().email('Email no valudi')
      .required('El email del cliente es obligatorio'),
  })

  if (loading || !data) return <h3>Cargando</h3>

  const { getClient } = data;

  const updatingClient = async (values) => {

    const { __typename, id, ...rest } = values;

    try {

      const { data } = await updateClient({
        variables: {
          updateClientId: id,
          input: rest
        }
      })

      Swal.fire(
        'Cliente Actualizado',
        'Correctamente!',
        'success'
      )

      router.push('/')
    } catch (error) {
      console.log(error)
      console.log(JSON.stringify(error, null, 2));

    }

  }

  return (
    <Layout>
      <h1 className='text-2xl text-grey-800 font-light'>Editar cliente</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={getClient}
            onSubmit={(values) => updatingClient(values)}
          >
            {
              (props) => {
                return (

                  <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                    onSubmit={props.handleSubmit}
                  >

                    <div className='mb-5'>
                      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>Nombre</label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                        type="text" id='nombre' placeholder='Juan Jose'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.nombre}
                      />
                    </div>

                    {
                      props.touched.nombre && props.errors.nombre && (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                          <p className='font-bold'>{props.errors.nombre}</p>
                        </div>
                      )
                    }

                    <div className='mb-5'>
                      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>Apellido</label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                        type="text" id='apellido' placeholder='Ruiz Ruiz'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.apellido}
                      />
                    </div>


                    {
                      props.touched.apellido && props.errors.apellido && (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                          <p className='font-bold'>{props.errors.apellido}</p>
                        </div>
                      )
                    }

                    <div className='mb-5'>
                      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>Empresa</label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                        type="text" id='empresa' placeholder='Empresa '
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.empresa}
                      />
                    </div>


                    {
                      props.touched.empresa && props.errors.empresa && (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                          <p className='font-bold'>{props.errors.empresa}</p>
                        </div>
                      )
                    }

                    <div className='mb-5'>
                      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>email</label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                        type="email" id='email' placeholder='email@email.com'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                      />
                    </div>



                    {
                      props.touched.email && props.errors.email && (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                          <p className='font-bold'>{props.errors.email}</p>
                        </div>
                      )
                    }
                    <div className='mb-5'>
                      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>Telefono</label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                        type="telefono" id='telefono' placeholder='numero de telefono'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.telefono}
                      />
                    </div>


                    {
                      props.touched.telefono && props.errors.telefono && (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                          <p className='font-bold'>{props.errors.telefono}</p>
                        </div>
                      )
                    }

                    <input type="submit"
                      className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900 '
                      value='editar cliente'
                    />



                  </form>

                )
              }
            }


          </Formik>
        </div>
      </div>

    </Layout>

  )
}

export default EditarCliente
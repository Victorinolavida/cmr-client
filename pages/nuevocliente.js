import React, { useState } from 'react'
import Layout from '../components/Layout'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput!){
    newClient(input: $input) {
      apellido
      nombre
      id
    }
  }`;

const GET_CLIENT_SELLER = gql`
  query getClientsBySeller{
    getClientsBySeller {
      apellido
      nombre
      creado
      email
      empresa
      id
    }
  }`

const Nuevocliente = () => {

  const router = useRouter()

  const [msg, setMsg] = useState(null)

  const [newClient] = useMutation(NEW_CLIENT, {
    refetchQueries: [
      {
        query: GET_CLIENT_SELLER
      }
    ]
    // update(cache, {
    //   data: newClient
    // }) {
    //   //obtener el objeto de cache que queremos actualizar
    //   const { getClientsBySeller } = cache.readQuery({ query: GET_CLIENT_SELLER })

    //   //Reescribimos el cache (el cache nunca de  modifica)

    //   cache.writeQuery({
    //     query: GET_CLIENT_SELLER,
    //     data: {
    //       getClientsBySeller: [...getClientsBySeller, newClient]
    //     }
    //   })
    // }
  })

  const formik = useFormik({
    initialValues: {
      'nombre': '',
      'apellido': '',
      'empresa': '',
      'email': '',
      'telefono': ''
    },
    validationSchema: new Yup.ObjectSchema({
      nombre: Yup.string().required('El nombre del cliente es obligatorio'),
      apellido: Yup.string().required('El apellido del cliente es obligatorio'),
      empresa: Yup.string().required('La empresa del cliente es obligatorio'),
      email: Yup.string().email('Email no valudi')
        .required('El email del cliente es obligatorio'),


    }),
    onSubmit: async values => {
      try {

        const { data } = await newClient({
          variables: {
            input: values
          }
        });

        router.push('/')
      } catch (error) {
        setMsg(error.message)
        console.log(error)

        setTimeout(() => setMsg(null), 3000)
      }
    }
  })


  const ShowMessage = () => {
    return (
      <div className='bg-white border-l-4 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{msg}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className='text-2xl text-grey-800 font-light'>Nuevo cliente</h1>

      {
        msg && <ShowMessage />
      }

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >

            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>Nombre</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="text" id='nombre' placeholder='Juan Jose'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
            </div>

            {
              formik.touched.nombre && formik.errors.nombre && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.nombre}</p>
                </div>
              )
            }

            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>Apellido</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="text" id='apellido' placeholder='Ruiz Ruiz'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
            </div>

            {
              formik.touched.apellido && formik.errors.apellido && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.apellido}</p>
                </div>
              )
            }

            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>Empresa</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="text" id='empresa' placeholder='Empresa '
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              />
            </div>

            {
              formik.touched.empresa && formik.errors.empresa && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.empresa}</p>
                </div>
              )
            }

            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>email</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="email" id='email' placeholder='email@email.com'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            {
              formik.touched.email && formik.errors.email && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.email}</p>
                </div>
              )
            }

            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>Telefono</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="telefono" id='telefono' placeholder='numero de telefono'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
              />
            </div>

            <input type="submit"
              className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900 '
              value='registrar cliente'
            />



          </form>
        </div>
      </div>

    </Layout>

  )
}

export default Nuevocliente
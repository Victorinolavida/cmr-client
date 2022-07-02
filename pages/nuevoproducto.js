import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import Layout from '../components/Layout'
import { GET_PRODUCTS } from './productos'

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput!) {
    newProduct(input: $input) {
      creado
      existencias
      id
      nombre
      precio
    }
  }
`

export const NuevoProducto = () => {
  const router = useRouter()

  const [newProduct] = useMutation(NEW_PRODUCT, {
    refetchQueries: [
      {
        query: GET_PRODUCTS
      }
    ]
  })


  const formik = useFormik({
    initialValues: {
      'nombre': '',
      'existencias': 0,
      'precio': 0,

    },
    validationSchema: new Yup.ObjectSchema({
      nombre: Yup.string().required('El nombre del cliente es obligatorio'),
      existencias: Yup.number().integer()
        .min(1, 'La exitencia debe ser mayor a 0')
        .required('La existencia del producto es obligatoria y mayor a cero'),
      precio: Yup.number().min(0.1).required('el precio es obligatorio'),
    }),
    onSubmit: async values => {
      try {

        await newProduct({
          variables: {
            input: values
          }
        })

        console.log(values)
        router.push('/productos')
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

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >

            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>Nombre</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="text" id='nombre'
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
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencias'>Existencias</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="number" id='existencias' placeholder='  '
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.existencias}
              />
            </div>

            {
              formik.touched.existencias && formik.errors.existencias && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.existencias}</p>
                </div>
              )
            }

            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>Precio</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="number" id='precio'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
              />
            </div>

            {
              formik.touched.precio && formik.errors.precio && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.precio}</p>
                </div>
              )
            }



            <input type="submit"
              className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900 '
              value='registrar nuevo producto'
            />



          </form>
        </div>
      </div>

    </Layout>
  )


}



export default NuevoProducto

// mutation newProduct($input: ProductInput!) {
//   newProduct(input: $input) {
//     creado
//     existencias
//     id
//     nombre
//     precio
//   }
// }
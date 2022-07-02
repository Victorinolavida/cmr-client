import Router, { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client'
import { Formik } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { GET_PRODUCTS } from '../productos';


const EDIT_PRODUCT = gql`
mutation updateProduct($updateProductId: ID!, $input: ProductInput!){updateProduct(id: $updateProductId, input: $input) {
  creado
  existencias
  nombre
}}
`

const GET_PRODUCT = gql`
query getProduct($getProductId: ID!){
  getProduct(id: $getProductId) {
    existencias
    precio
    nombre
  }
}
`

const EditarProduto = () => {

  const { query: { id } } = useRouter()
  const router = useRouter()


  const [updateProduct] = useMutation(EDIT_PRODUCT, {
    refetchQueries: [
      {
        query: GET_PRODUCTS
      }
    ]
  });
  const { data, loading } = useQuery(GET_PRODUCT, { variables: { getProductId: id } });

  if (!data || loading) return <h3>cargando</h3>


  const { existencias, nombre, precio } = data.getProduct;

  const validation = new Yup.ObjectSchema({
    nombre: Yup.string().required('El nombre del cliente es obligatorio'),
    existencias: Yup.number().integer()
      .min(1, 'La exitencia debe ser mayor a 0')
      .required('La existencia del producto es obligatoria y mayor a cero'),
    precio: Yup.number().min(0.1).required('el precio es obligatorio'),
  })

  const updatingProduct = async (values) => {

    try {

      await updateProduct({
        variables: {
          updateProductId: id,
          input: values
        }
      })

      Swal.fire(
        'Producto Actualizado',
        'Correctamente!',
        'success'
      )

      router.push('/productos')


    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Layout>
      <h1 className='text-2xl text-grey-800 font-light'>Editar Producto</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <Formik
            initialValues={{
              nombre, precio, existencias
            }}
            enableReinitialize
            validationSchema={validation}
            onSubmit={(values) => updatingProduct(values)}
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
                        type="text" id='nombre'
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
                      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existencias'>Existencias</label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                        type="number" id='existencias' placeholder='  '
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.existencias}
                      />
                    </div>

                    {
                      props.touched.props && props.errors.existencias && (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                          <p className='font-bold'>{props.errors.existencias}</p>
                        </div>
                      )
                    }

                    <div className='mb-5'>
                      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='precio'>Precio</label>
                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                        type="number" id='precio'
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.precio}
                      />
                    </div>

                    {
                      props.touched.precio && props.errors.precio && (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                          <p className='font-bold'>{props.errors.precio}</p>
                        </div>
                      )
                    }

                    <input type="submit"
                      className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900 '
                      value='actualizar producto '
                    />
                  </form>
                )
              }
            }
          </Formik>
        </div>
      </div>

    </Layout >
  )

}

export default EditarProduto
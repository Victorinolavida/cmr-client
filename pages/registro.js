import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

//sin gql el query de Graphql se interpreta como codigo de JS
// asi sque gpl lo hace funcionar como queremos

const NEW_ACCOUNT = gql`
mutation newUser($input: UserInput!){
  newUser(input: $input) {
    apellido
    email
    id
  }
}`

const Registro = () => {

  //state para el mensaje
  const [message, setMessage] = useState(null)

  //obtener productos de graphql
  // const { data, loading, error } = useQuery(QUERY)
  // console.log(data)

  //CREANDO NUEVO USER
  const [newUser] = useMutation(NEW_ACCOUNT);

  const router = useRouter()


  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: ''
    },
    validationSchema: new Yup.ObjectSchema({
      nombre: Yup.string().required('El nombre es obligatorio'),
      apellido: Yup.string().required('El apellido es obligatorio'),
      email: Yup.string().email('Email no valido')
        .required('El email es obligatorio'),
      password: Yup.string().required('El password es obligatorio')
        .min(6, 'El password debe de ser de almenos 6 caracteres')

    }),
    onSubmit: async ({ nombre, apellido, email, password }) => {

      try {
        const { data } = await newUser({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              password
            }
          }
        })

        router.push('/')

      } catch (error) {
        setMessage(error.message)

        setTimeout(() => setMessage(null), 2000)
      }
    }
  })

  const showMessage = () => {
    return (
      <div className='bg-white border-l-4 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <Layout>
      {
        message && showMessage()
      }
      <h1 className='text-center text-2xl text-white font-light'>Registro</h1>
      <div className='flex justify-center mt-3'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-sm px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>Nombre</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="text" id='nombre' placeholder='Juan Carlos'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.nombre && formik.errors.nombre && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.nombre}</p>
                </div>
              )
            }
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>Apellido</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="text" id='apellido' placeholder='Perez Mendoza'
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}

              />
            </div>
            {
              formik.touched.apellido && formik.errors.apellido && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.apellido}</p>
                </div>
              )
            }
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="email" id='email' placeholder='usuario@usuario.com'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.email && formik.errors.email && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.email}</p>
                </div>
              )
            }
            <div className='mb-2'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="password" id='password' placeholder='usuario@usuario.com'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              formik.touched.password && formik.errors.password && (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2'>
                  <p className='font-bold'>{formik.errors.password}</p>
                </div>
              )
            }
            <input type="submit"
              className='bg-gray-700 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer'
              value='Iniciar sesión'
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Registro
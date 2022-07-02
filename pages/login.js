import { useFormik } from 'formik'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

const AUTH_USER = gql`
  mutation authUser($input: AuthInput!) {
    authUser(input: $input) {
      token
    }
  }
`

const Login = () => {

  const [message, setMessage] = useState(null)

  const router = useRouter();

  const [authUser] = useMutation(AUTH_USER)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: new Yup.ObjectSchema({
      email: Yup.string().email('El email no es válido').required(),
      password: Yup.string().required('el password es obligatorio')

    }),
    onSubmit: async values => {

      try {
        const { data } = await authUser({
          variables: {
            input: {
              email: values.email,
              password: values.password
            }
          }
        })

        //guardando en local storage

        const { token } = data.authUser;

        localStorage.setItem('token-CRM', token);

        router.push('/')

      } catch (error) {
        setMessage(error.message)

        setTimeout(() => setMessage(null), 3000)
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
      <h1 className='text-center text-2xl text-white font-light'>Login</h1>


      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form className='bg-white rounded shadow-sm px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="email" id='email' placeholder='usuario@usuario.com'
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
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                type="password" id='password' placeholder='usuario@usuario.com'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
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

export default Login
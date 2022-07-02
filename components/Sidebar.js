import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const Sidebar = () => {
  const router = useRouter();




  return (
    <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5  sm:min-h-screen p-5'>
      <div>
        <p className='text-white font-black text-2xl'>CMR Clientes</p>
      </div>
      <nav className='mt-5 list-none'>
        <li className={router.pathname === '/' ? "bg-blue-800 p-2 rounded-sm" : "p-3"}>
          <Link href='/' >
            <a className='text-white'>Clientes</a>
          </Link>
        </li>
        <li className={router.pathname === '/productos' ? "bg-blue-800 p-2 rounded-sm" : "p-2"}>
          <Link href='/productos' >
            <a className='text-white'>Productos</a>
          </Link>
        </li>
        <li className={router.pathname === '/pedidos' ? "bg-blue-800 p-2 rounded-sm" : "p-2"}>
          <Link href='/pedidos' >
            <a className='text-white'>Pedidos</a>
          </Link>
        </li>
      </nav>

      <div className='mt-5'>
        <p className='text-white font-black text-2xl'>Otras opciones</p>
      </div>

      <nav className='mt-5 list-none'>
        <li className={router.pathname === '/mejoresvendedores' ? "bg-blue-800 p-2 rounded-sm" : "p-2"}>
          <Link href='/mejoresvendedores' >
            <a className='text-white'>Mejores vendedores</a>
          </Link>
        </li><li className={router.pathname === '/mejoresclientes' ? "bg-blue-800 p-2 rounded-sm" : "p-2"}>
          <Link href='/mejoresclientes' >
            <a className='text-white'>Mejores clientes</a>
          </Link>
        </li>
      </nav>
    </aside>
  )
}

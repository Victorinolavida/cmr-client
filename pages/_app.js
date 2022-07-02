import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
import { PedidoState } from '../context/pedido/PedidoState'
import '../styles/globals.css'

//se tiene que instalar graphql
function MyApp({ Component, pageProps }) {

  return (

    <ApolloProvider client={client}>
      <PedidoState>
        <Component {...pageProps} />
      </PedidoState>
    </ApolloProvider>
  )

}

export default MyApp

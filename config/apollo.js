import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';



const httpLink = createHttpLink({
  // uri: 'http://localhost:4000/'
  uri: 'https://cmr-victorino.herokuapp.com/'
})

const authLink = setContext((_, { headers }) => {

  //leer local storage

  const token = localStorage.getItem('token-CRM')

  // console.log(token)

  return {

    headers: {
      ...headers,
      Authorization: token || ''
    }
  }
})

// const client = new ApolloClient({
//   connectToDevTools: true,
//   cache: new InMemoryCache(),   
//   link: new HttpLink({
//     uri: 'http://localhost:4000/'
//   })
// });
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});




export default client;

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "antd/dist/antd.css"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"

let apolloUri = "http://localhost:4000/graphql"

const client = new ApolloClient({
  uri: apolloUri,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "antd/dist/antd.css"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client"
import {RecoilRoot} from "recoil"
import {BASE_URL} from "./config"

const apolloUri = `${BASE_URL}/graphql`

const client = new ApolloClient({
  uri: apolloUri,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
)

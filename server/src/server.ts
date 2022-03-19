import express from "express"
import http from "http"
import {ApolloServer} from "apollo-server-express"
import {ApolloServerPluginDrainHttpServer} from "apollo-server-core"
import {schema} from "./schema"

const PORT = 4000

const startApolloServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    dataSources: () => ({})
  })

  await server.start()
  server.applyMiddleware({app})

  await new Promise(() => httpServer.listen({port: PORT}))
}

startApolloServer()

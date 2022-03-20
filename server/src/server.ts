import express from "express"
import http from "http"
import {ApolloServer} from "apollo-server-express"
import {ApolloServerPluginDrainHttpServer} from "apollo-server-core"
import {schema} from "./schema"
import {BooksSource} from "./datasources/booksSource"
import path from "path"

const PORT = 4000

const ebooksKnexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.join(__dirname, "../../data/ebooks/metadata.db")
  }
}

const audiobooksKnexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.join(__dirname, "../../data/audiobooks/metadata.db")
  }
}

const startApolloServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    dataSources: () => ({
      ebooksSource: new BooksSource(ebooksKnexConfig),
      audiobooksSource: new BooksSource(audiobooksKnexConfig)
    })
  })

  await server.start()

  app.use(express.static(path.join(__dirname, "../../data/")))

  server.applyMiddleware({app})

  await new Promise(() => httpServer.listen({port: PORT}))
}

startApolloServer()

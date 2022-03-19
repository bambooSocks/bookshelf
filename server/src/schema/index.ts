import path from "path"
import {readFileSync} from "fs"
import {makeExecutableSchema} from "@graphql-tools/schema"
import {resolvers} from "../resolvers"

const TYPE_DEFS_FILENAME = "type-defs.graphql"
const typeDefs = readFileSync(path.join(__dirname, TYPE_DEFS_FILENAME)).toString("utf-8")

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export interface CustomDataSources {}

export interface CustomeResolversContext {
  dataSources: CustomDataSources
}

export const resolvers = {
  Query: {
    test: () => "Hello there :D"
  }
}

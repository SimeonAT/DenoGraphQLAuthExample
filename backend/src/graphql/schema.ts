const schemaPath = './src/graphql/schema.gql';
const typeDefs = await Deno.readTextFile(schemaPath);

export default typeDefs;
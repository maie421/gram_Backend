require("dotenv").config
import {GraphQLServer} from "graphql-yoga";

const typeDefs=`
    type Query{
        hello:String!
    }
`;
const resolvers={
    Query:{
    hello:()=>"Hi"
    }
}
const server=new GraphQLServer({typeDefs,resolvers})
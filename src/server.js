import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import {authenticateJwt} from "./passport";
import {isAuthenticated} from "./middlewares";

//sendSecretMail("maie421@naver.com", "123");
const PORT = process.env.PORT || 2000;

const server = new GraphQLServer({
  schema,
  context:({request})=>({request,isAuthenticated})
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
//server.express.use(passport.authenticate("jwt"));

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
import dotenv from "dotenv";//숨겨진 파일 확인
import path from "path";
//console.log(`주소:${__dirname}`);
dotenv.config({path:path.resolve(__dirname,".env")});

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

sendSecretMail("maie421@naver.com", "123");
const PORT = process.env.PORT || 2000;

const server = new GraphQLServer({schema});

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
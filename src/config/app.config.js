import dotenv from "dotenv";

dotenv.config();

const { env } = process;

const appVariables = {
  port: 3000,
  appUrl: env.APP_URL,
  dbUrl: env.DATABASE_URL,
  secretKey: env.SECRET_KEY
};

export default appVariables;

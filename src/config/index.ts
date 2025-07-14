import dotenv from "dotenv";
dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
};

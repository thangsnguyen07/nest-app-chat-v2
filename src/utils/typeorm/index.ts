import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.env.development` });
import { DataSource } from 'typeorm';
import { User, Session } from './entities';

const entities = [User, Session];
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_DB_HOST,
  port: parseInt(process.env.MYSQL_DB_PORT),
  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  entities,
  synchronize: true,
});

export { User, Session };
export default entities;

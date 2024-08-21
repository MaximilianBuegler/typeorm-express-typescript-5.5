import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dataSourceOptionsSeed: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/seeds/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
};

const dataSource: DataSource = new DataSource(dataSourceOptionsSeed);

export = dataSource;

import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  JWT_SECRET: string;
  JWT_DURATION: string;
}

const schema = Joi.object<EnvVars>({
  PORT: Joi.number().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_DURATION: Joi.string().required(),
}).unknown(true);

const { value, error } = schema.validate(process.env);

if (error) throw new Error(`Faltan configuraciones ${error.message}`);

const envVars: EnvVars = value;

export const envs: EnvVars = {
  PORT: envVars.PORT,
  DATABASE_NAME: envVars.DATABASE_NAME,
  DATABASE_HOST: envVars.DATABASE_HOST,
  DATABASE_PASSWORD: envVars.DATABASE_PASSWORD,
  DATABASE_PORT: envVars.DATABASE_PORT,
  DATABASE_USER: envVars.DATABASE_USER,
  JWT_DURATION: envVars.JWT_DURATION,
  JWT_SECRET: envVars.JWT_SECRET,
};

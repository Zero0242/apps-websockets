import 'dotenv/config';
import * as Joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_DURATION: string;
}

const schema = Joi.object<EnvVars>({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_DURATION: Joi.string().required(),
}).unknown(true);

const { value, error } = schema.validate(process.env);

if (error) throw new Error(`Faltan configuraciones ${error.message}`);

const envVars: EnvVars = value;

export const envs: EnvVars = {
  PORT: envVars.PORT,
  DATABASE_URL: envVars.DATABASE_URL,
  JWT_DURATION: envVars.JWT_DURATION,
  JWT_SECRET: envVars.JWT_SECRET,
};

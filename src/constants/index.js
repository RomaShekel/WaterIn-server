// src/constants/index.js
import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const TIME_PATTERN = '^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';

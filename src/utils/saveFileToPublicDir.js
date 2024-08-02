import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constants/index.js';
import path from 'node:path';
import { env } from './env.js';

const saveFileToPublicDir = async (file) => {
  await fs.rename(
    path.join(TEMPLATES_DIR, file.filename),
    // path.join(PUBLIC_PHOTOS_DIR, file.filename),
  );

  return `${env('APP_DOMAIN')}/public/${file.filename}`;
};

export default saveFileToPublicDir;

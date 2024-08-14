import multer from 'multer';
import { TEMPLATES_DIR } from '../constants/index.js';
import createHttpError from 'http-errors';

const storage = multer.diskStorage({
  destination: TEMPLATES_DIR,
  filename: (req, file, callback) => {
    const uniquePreffix = Date.now();
    const filename = `${uniquePreffix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extencion = file.originalname.split('.').pop();
  if (extencion === 'exe') {
    return callback(createHttpError(400, '.exe file not allowed'));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;

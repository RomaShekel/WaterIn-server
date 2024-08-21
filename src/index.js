// src/index.js
import cron from 'node-cron'
import axios from 'axios'
import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

const bootstrap = async () => {
    await initMongoConnection();
    setupServer();
};

bootstrap();
// cron.schedule('*/1 * * * *', async () => {
//     await axios.get('https://waterin-server.onrender.com/server-refresh')
//     .catch(err => console.log(err))
// })
import './utils/cron.js'
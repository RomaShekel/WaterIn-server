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
cron.schedule('*/1 * * * *', async () => {
    try {
        const response = await axios.get('https://waterin-server-2.onrender.com');
        console.log('Server pinged successfully', response.status);
      } catch (error) {
        console.error('Error pinging server', error);
      }
})
import './utils/cron.js'
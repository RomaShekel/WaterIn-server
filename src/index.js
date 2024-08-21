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
cron.schedule('*/3 * * * *', async () => {
    await axios.get('https://waterin-server-2.onrender.com/server-refresh')
    .catch(err => console.log(err))
})
import './utils/cron.js'
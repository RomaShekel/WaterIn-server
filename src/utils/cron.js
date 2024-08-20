import cron from 'node-cron'
import { ReminderCollection } from '../db/model/reminder.js'

cron.schedule('*/1 * * * *', async () => {
    const date = new Date()
    const reminders = await ReminderCollection.find({ remindAt: { $lte: date}, isSended: false});

    reminders.forEach(async (reminder) => {
        // await 
        console.log('AWADREINUMS');
        console.log(reminder);
    })
})
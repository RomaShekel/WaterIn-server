import cron from 'node-cron'
import { ReminderCollection } from '../db/model/reminder.js'
import { sendEmail } from './sendMail.js'
import { env } from './env.js'
import { SMTP } from '../constants/index.js'

cron.schedule('*/1 * * * *', async () => {
    const date = new Date()
    console.log(date)
    const reminders = await ReminderCollection.find({ remindAt: { $lte: date}, sendRemindEmail: true, isSended: false});
console.log(reminders)

    reminders.forEach(async (reminder) => {
        await sendEmail({
            from: env(SMTP.SMTP_FROM),
            to: reminder.email,
            subject: 'Do you remember about water?',
            html: `<h1>Pleas drink your water</h1>`,
        })

        reminder.isSended = true
        await reminder.save()
    })
})
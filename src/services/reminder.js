import { ReminderCollection } from "../db/model/reminder.js";

export const createReminder = async (payload) => {
    const date = await ReminderCollection.create(payload);
    return date;
}
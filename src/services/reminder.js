import { ReminderCollection } from "../db/model/reminder";

export const createReminder = async (payload) => {
    const date = await ReminderCollection.create(payload);
    return date;
}
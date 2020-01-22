const gsheets = require('../../middleware/google/gsheets');

export const interval = '*/1 * * * *';
export const perform = async () => {
  const reminders = [];
  await gsheets.getAllReminders().then(response => {
    response.forEach(reminder => {
      reminders.push(reminder);
    });
  });

  await gsheets.getRepeatingReminders().then(response => {
    response.forEach(reminder => {
      reminders.push(reminder);
    });
  });

  return [
    {
      target: 'Reminders',
      data: {
        value: reminders,
      },
    },
  ];
};

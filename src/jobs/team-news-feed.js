const gsheets = require('../../middleware/google/gsheets');

export const interval = '*/1 * * * *';
export const perform = async () => {
  let reminders = '';
  await gsheets.getAllTeamNews().then(response => {
    reminders = response;
  });

  return [
    {
      target: 'TeamNews',
      data: {
        value: reminders,
      },
    },
  ];
};

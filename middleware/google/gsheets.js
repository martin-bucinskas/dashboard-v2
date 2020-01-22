const moment = require('moment');
const googleAuth = require('./google-auth');
const { google } = require('googleapis');

// const SPREADSHEET_ID = '1scieI0CU5Suyze7cg8pV8kzYHJXUKzieUtJhAdOLyIc'; // OLD <-
const SPREADSHEET_ID = '1ppmQw80qsTlz7deRC027H0hVhQYrieIwYqc4ywAMdTg';

async function getAllReminders() {
  return googleAuth.getAllContent(retrieveAllOneOffReminders);
}

async function getRepeatingReminders() {
  return googleAuth.getAllContent(retrieveAllRepeatingReminders);
}

async function getAllOverheard() {
  return googleAuth.getAllContent(retrieveAllOverheard);
}

async function getAllTeamNews() {
  return googleAuth.getAllContent(retrieveAllTeamNews);
}

async function getLatestWifiPassword() {
  return googleAuth.getAllContent(retrieveLatestWifiPassword);
}

async function getAllBirthdays() {
  return googleAuth.getAllContent(retrieveAllBirthdays);
}

const retrieveLatestWifiPassword = async auth => {
  let latestWifiPassword = [];
  const SHEET_NAME = 'wifi-passwords';
  const sheets = google.sheets({
    version: 'v4',
    auth
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`
      },
      (err, res) => {
        if (err) {
          return console.log(`The API returned an error: ${err}`);
        }

        const rows = res.data.values;

        const todaysDate = new Date();

        if (rows.length) {
          rows.map(row => {
            if (row[0] !== 'content') {
              const startDate = moment(row[1], 'DD-MM-YYYY').toDate();

              if (todaysDate >= startDate) {
                latestWifiPassword.push({
                  wifiPassword: row[0],
                  startDate: row[1]
                });
              }
            }
          });
        } else {
          console.log('No Wifi data found.');
        }
        resolve(latestWifiPassword.slice(latestWifiPassword.length - 1));
      }
    );
  });
};

const retrieveAllOverheard = async auth => {
  const overheard = [];
  const SHEET_NAME = 'overheard';
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`
      },
      (err, res) => {
        if (err) {
          return console.log(`The API returned an error: ${err}`);
        }

        const rows = res.data.values;

        if (rows.length) {
          rows.map(row => {
            if (row[0] !== 'Quote') {
              overheard.push(row[0]);
            }
          });
        } else {
          console.log('No overheard found.');
        }
        resolve(overheard);
      }
    );
  });
};

const retrieveAllTeamNews = async auth => {
  const teamNews = [];
  const SHEET_NAME = 'team-news';
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`,
      },
      // eslint-disable-next-line consistent-return
      (err, res) => {
        if (err) {
          return console.log(`The API returned an error: ${err}`);
        }

        const rows = res.data.values;

        if (rows.length) {
          // eslint-disable-next-line array-callback-return
          rows.map(row => {
            if (row[0] !== 'heading') {
              const startDateTime = moment(
                row[2] + row[4],
                'DD-MM-YYYY HH:mm'
              ).toDate();
              const endDateTime = moment(
                row[3] + row[5],
                'DD-MM-YYYY HH:mm'
              ).toDate();

              if (
                isPassEndDateOrCurrentDate(endDateTime) &&
                isInThePastOrCurrentDate(startDateTime)
              ) {
                teamNews.push({
                  heading: row[0],
                  body: row[1],
                  startDate: row[2],
                  endDate: row[3],
                  startTime: row[4],
                  endTime: row[5],
                });
              }
            }
          });
        } else {
          console.log('No team news found.');
        }
        resolve(teamNews);
      }
    );
  });
};

const isInThePastOrCurrentDate = date => {
  const todaysDate = new Date();
  return date <= todaysDate;
};

const isPassEndDateOrCurrentDate = date => {
  const todaysDate = new Date();
  return date >= todaysDate;
};

const retrieveAllOneOffReminders = async auth => {
  const reminders = [];
  const SHEET_NAME = 'one-off-reminders';
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`,
      },
      // eslint-disable-next-line consistent-return
      (err, res) => {
        if (err) {
          return console.log(`The API returned an error: ${err}`);
        }

        const rows = res.data.values;

        if (rows.length) {
          // eslint-disable-next-line array-callback-return
          rows.map(row => {
            if (row[0] !== 'heading') {
              const startDateTime = moment(
                row[2] + row[3],
                'DD-MM-YYYY HH:mm'
              ).toDate();
              const endDateTime = moment(
                row[2] + row[4],
                'DD-MM-YYYY HH:mm'
              ).toDate();

              if (
                isPassEndDateOrCurrentDate(endDateTime) &&
                isInThePastOrCurrentDate(startDateTime)
              ) {
                reminders.push({
                  heading: row[0],
                  content: row[1],
                  startDate: row[2],
                  startTime: row[3],
                  endDate: row[2],
                  endTime: row[4],
                });
              }
            }
          });
        } else {
          console.log('No data found.');
        }
        resolve(reminders);
      }
    );
  });
};

const retrieveAllRepeatingReminders = async auth => {
  const reminders = [];
  const SHEET_NAME = 'repeating-reminders';
  const sheets = google.sheets({
    version: 'v4',
    auth,
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`,
      },
      // eslint-disable-next-line consistent-return
      (err, res) => {
        if (err) {
          return console.log(`The API returned an error: ${err}`);
        }

        const rows = res.data.values;

        if (rows.length) {
          // eslint-disable-next-line array-callback-return
          // 1/22/2020, 12:19:02 PM
          const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
          const day = new Date().getDay();
          // const today = new Date(Date.now()).toLocaleString().split(',')[0];
          const currentDate = new Date();
          let dd = currentDate.getDate();
          let mm = currentDate.getMonth() + 1;
          const yyyy = currentDate.getFullYear();
          if (dd < 10) {
            dd = `0${dd}`;
          }
          if (mm < 10) {
            mm = `0${mm}`;
          }
          const today = `${dd}/${mm}/${yyyy}`;
          // eslint-disable-next-line array-callback-return
          rows.map(row => {
            if (row[0] !== 'heading') {
              const days = row[2].split(',');
              const startDateTime = moment(
                today + row[3],
                'DD-MM-YYYY HH:mm'
              ).toDate();
              const endDateTime = moment(
                today + row[4],
                'DD-MM-YYYY HH:mm'
              ).toDate();
              if (
                isPassEndDateOrCurrentDate(endDateTime) &&
                isInThePastOrCurrentDate(startDateTime) &&
                days.includes(weekday[day])
              ) {
                reminders.push({
                  heading: row[0],
                  content: row[1],
                  startDate: today,
                  startTime: row[3],
                  endDate: today,
                  endTime: row[4],
                });
              }
            }
          });
        } else {
          console.log('No data found.');
        }
        resolve(reminders);
      }
    );
  });
};

const retrieveAllBirthdays = async auth => {
  const birthdays = [];
  const SHEET_NAME = 'ET_birthdays';
  const sheets = google.sheets({
    version: 'v4',
    auth
  });

  return new Promise(function(resolve, reject) {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}`,
      },
      (err, res) => {
        if (err) {
          return console.log(`The API returned an error: ${err}`);
        }

        const rows = res.data.values;

        if (rows.length) {
          //filter to make sure that only people with consent to "Other communication"
          rows
            .filter(row => (row[4]) && (row[4].toUpperCase() === 'YES'))
            .map(row => birthdays.push({ name: row[0], date: row[1] }));
        } else {
          console.log('No Birthdays found.');
        }
        resolve(birthdays);
      }
    );
  });
};

exports.getAllReminders = getAllReminders;
exports.getAllOverheard = getAllOverheard;
exports.getAllTeamNews = getAllTeamNews;
exports.getLatestWifiPassword = getLatestWifiPassword;
exports.getAllBirthdays = getAllBirthdays;
exports.getRepeatingReminders = getRepeatingReminders;

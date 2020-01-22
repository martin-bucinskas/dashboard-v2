const googleAuth = require('./google-auth');
const { google } = require('googleapis');

require('dotenv').config();

const GDRIVE_GALLERY_FOLDER_ID = process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID;

async function retrieveAllImagesFromFolder(auth) {
  const drive = google.drive({ version: 'v3', auth });

  return new Promise((resolve, reject) => {
    drive.files.list(
      {
        q: `parents='${GDRIVE_GALLERY_FOLDER_ID}'`,
        fields: 'files(name,originalFilename,thumbnailLink)',
        maxResults: 1000,
      },
      (err, res) => {
        if (err) {
          console.log('The API returned an error: ', err);
          return reject('Could not retrieve images');
        }

        const files = res.data.files;
        if (files) {
          resolve(files);
        }

        resolve([]);
      }
    );
  });
}

async function getAllGalleryImages() {
  return googleAuth.getAllContent(retrieveAllImagesFromFolder);
}

module.exports = {
  getAllGalleryImages,
};

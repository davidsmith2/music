const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const API_HOST = 'localhost';
const API_PORT = 3333;
const API_PATH = '/api/library';
const API_METHOD = 'POST';

const MUSIC_MEDIA_FOLDER_NAME = 'Test';
const EXCLUDED_FILES = ['.DS_Store'];
const GET_FILE_METADATA_SCRIPT = 'get-file-metadata.sh';

function createLibrary() {
  const songs = [];
  const artistDirs = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME));
  artistDirs.filter((artistDir) => {
    return !EXCLUDED_FILES.includes(artistDir);
  }).forEach((artistDir) => {
    const albumDirs = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME, artistDir));
    albumDirs.filter((albumDir) => {
      return !EXCLUDED_FILES.includes(albumDir);
    }).forEach((albumDir) => {
      const songFiles = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME, artistDir, albumDir));
      songFiles.filter((songFile) => {
        return !EXCLUDED_FILES.includes(songFile);
      }).forEach((songFile) => {
        const songPath = path.join(__dirname, MUSIC_MEDIA_FOLDER_NAME, artistDir, albumDir, songFile);
        const scriptPath = path.join(__dirname, GET_FILE_METADATA_SCRIPT);
        const command = `${scriptPath} "${songPath}"`;
        let jsonSong = null;
        let song = null;
        try {
          console.log('Getting metadata for', songPath);
          jsonSong = execSync(command).toString();
        } catch (e) {
          console.error('Error executing command', e);
        }
        if (jsonSong) {
          song = {
            id: null,
            ...JSON.parse(jsonSong)
          };
          songs.push(song);
        }
      });
    });
  });
  return {
    username: 'davidsmith2@gmail.com',
    songs
  };
}

function saveLibrary(library) {
  // Path to the certificate and key files
  const certPath = path.join(process.cwd(), '../../secrets/certificate.pem');
  const keyPath = path.join(process.cwd(), '../../secrets/private-key.pem');
  const caPath = path.join(process.cwd(), '../../secrets/certificate.pem');
  // Read the certificate and key files
  const cert = fs.readFileSync(certPath);
  const key = fs.readFileSync(keyPath);
  const ca = fs.readFileSync(caPath);
  const postData = JSON.stringify(library);
  const reqOptions = {
    host: API_HOST,
    port: API_PORT,
    path: API_PATH,
    method: API_METHOD,
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    },
    key,
    cert,
    ca,
    rejectUnauthorized: false
  };
  const req = https.request(reqOptions, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      // console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
}

const library = createLibrary();

saveLibrary(library);

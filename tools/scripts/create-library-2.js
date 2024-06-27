const fs = require('fs');
const path = require('path');
const http = require('http');
const XXH = require('xxhashjs');
const { dir } = require('console');
const { execSync } = require('child_process');
const exec = require('child_process').exec;

const API_HOST = 'localhost';
const API_PORT = 3333;
const API_PATH = '/api/import';
const API_METHOD = 'POST';

const MUSIC_MEDIA_FOLDER_NAME = 'Music';
const EXCLUDED_FILES = ['.DS_Store'];
const GET_FILE_METADATA_SCRIPT = 'get-file-metadata.sh';

function hash(input, _seed) {
  const seed = _seed.toString().padStart(6, '0');
  const hash = XXH.h32(input, seed).toString(16);
  return hash;
}

function getData(dirs, cb) {
  return dirs.filter((dir) => {
    return EXCLUDED_FILES.indexOf(dir) === -1;
  }).map((dir, idx) => {
    return cb(dir, idx);
  })
}

function getSongs(artist, album) {
  const dirs = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME, artist, album));
  return getData(dirs, (dir, id) => {
    const song = {
      id: hash(dir, Number(`${artist.id}${album.id}${id}`)),
      title: dir,
      artist,
      album
    };
    return song;
  });
}

function getAlbums(artist) {
  const dirs = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME, artist));
  return getData(dirs, (dir, id) => {
    const album = {
      id: hash(dir, Number(`${artist.id}${id}`)),
      artist,
      title: dir,
      cover: null
    };
    return album;
  });
}

function getArtists() {
  const dirs = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME));
  return getData(dirs, (dir, id) => {
    const artist = {
      id: hash(dir, id),
      name: dir,
      albums: []
    };
    return artist;
  });
}

function getLibrary(artists) {
  const library = {
    artists
  };
  return library;
}

function saveLibrary(library) {
  const postData = JSON.stringify(library);
  const reqOptions = {
    host: API_HOST,
    port: API_PORT,
    path: API_PATH,
    method: API_METHOD,
    body: postData,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const req = http.request(reqOptions, (res) => {
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

function buildLibrary() {
  const songs = [];
  const artistDirs = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME));
  artistDirs.filter((artistDir) => {
    return EXCLUDED_FILES.indexOf(artistDir) === -1;
  }).forEach((artistDir) => {
    const albumDirs = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME, artistDir));
    albumDirs.filter((albumDir) => {
      return EXCLUDED_FILES.indexOf(albumDir) === -1;
    }).forEach((albumDir) => {
      const songFiles = fs.readdirSync(path.join(MUSIC_MEDIA_FOLDER_NAME, artistDir, albumDir));
      songFiles.filter((songFile) => {
        return EXCLUDED_FILES.indexOf(songFile) === -1;
      }).forEach((songFile) => {
        let songPath = path.join(__dirname, MUSIC_MEDIA_FOLDER_NAME, artistDir, albumDir, songFile);
        const scriptPath = path.join(__dirname, GET_FILE_METADATA_SCRIPT);
        const command = `${scriptPath} "${songPath}"`;
        let output;
        try {
          output = execSync(command).toString();
        } catch (e) {
          console.error('Error executing command', e);
        }
        if (output) {
          songs.push(JSON.parse(output));
        }
      });
    });
  });
  return songs;
}

const library = buildLibrary();

saveLibrary(library);

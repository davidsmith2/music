const fs = require('fs');
const path = require('path');
const http = require('http');

const API_HOST = 'localhost';
const API_PORT = 3333;
const API_PATH = '/api/library';
const API_METHOD = 'POST';

const MUSIC_MEDIA_FOLDER_NAME = 'Music';
const EXCLUDED_FILES = ['.DS_Store'];

function getData(dirs, cb) {
  return dirs.filter((dir) => {
    return EXCLUDED_FILES.indexOf(dir) === -1;
  }).map((dir) => {
    return cb(dir);
  })
}

function getArtists(a) {
  const dirs = fs.readdirSync(path.join(a));
  return getData(dirs, (dir) => {
    return {
      name: dir,
      albums: []
    };
  });
}

function getAlbums(a, b) {
  const dirs = fs.readdirSync(path.join(a, b));
  return getData(dirs, (dir) => {
    return {
      artist: b,
      title: dir,
      cover: null
    };
  });
}

function getTracks(a, b, c) {
  const dirs = fs.readdirSync(path.join(a, b, c));
  return getData(dirs, (dir) => {
    return {
      title: dir,
      artist: b,
      album: c
    };
  });
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
  const library = {
    artists: null
  };
  const artists = getArtists(MUSIC_MEDIA_FOLDER_NAME);
  artists.forEach((artist) => {
    const albums = getAlbums(MUSIC_MEDIA_FOLDER_NAME, artist.name);
    artist.albums = albums;
    albums.forEach((album) => {
      const tracks = getTracks(MUSIC_MEDIA_FOLDER_NAME, artist.name, album.title);
      album.tracks = tracks;
    });
  });
  library.artists = artists;
  return library;
}

const library = buildLibrary();

saveLibrary(library);

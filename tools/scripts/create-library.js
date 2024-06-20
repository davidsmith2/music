const fs = require('fs');
const path = require('path');
const http = require('http');
const XXH = require('xxhashjs');

const API_HOST = 'localhost';
const API_PORT = 3333;
const API_PATH = '/api/library';
const API_METHOD = 'POST';

const MUSIC_MEDIA_FOLDER_NAME = 'Music';
const EXCLUDED_FILES = ['.DS_Store'];

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
  const artists = getArtists();
  const library = getLibrary(artists);
  library.artistIds = artists.map((artist) => artist.id);
  artists.forEach((artist) => {
    const albums = getAlbums(artist.name);
    artist.albums = albums;
    artist.albumIds = albums.map((album) => album.id);
    albums.forEach((album) => {
      const songs = getSongs(artist.name, album.title);
      album.songs = songs;
      album.songIds = songs.map((song) => song.id);
    });
  });
  return library;
}

const library = buildLibrary();

saveLibrary(library);

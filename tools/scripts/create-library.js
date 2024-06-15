const fs = require('fs');
const path = require('path');

const MUSIC_MEDIA_FOLDER_NAME = 'Music';
const OUTPUT_PATH = '../../apps/music-artwork-generator-api/src/assets/Library.json';
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
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(library));
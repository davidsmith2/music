const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const exec = require('child_process').exec;
const uuid = require('uuid');
const url = require('url');

const LIBRARY_URL = 'http://localhost:3333/api/library';
const LIBRARY_FOLDER_NAME = 'Music';
const EXCLUDED_FILES = ['.DS_Store'];
const COVER_DIMENSIONS = '600x600';
const COVER_DENSITY = '72';

function getUrlExtension(urlString) {
  const pathname = url.parse(urlString).pathname;
  const ext = path.extname(pathname);
  return ext;
};

function embedImage(coverPath, album) {
  const albumArtist = album.artist.replace(' ', '\ ');
  const albumTitle = album.title.replace(' ', '\ ');
  const albumPath = path.join(__dirname, LIBRARY_FOLDER_NAME, albumArtist, albumTitle);
  fs.readdir(albumPath, function(err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.filter((track) => {
      return EXCLUDED_FILES.indexOf(track) === -1;
    }).forEach(function (file) {
      const trackPath = path.join(albumPath, file);
        // Execute the binary
      exec(`AtomicParsley "${trackPath}" --artwork ${coverPath} --overWrite`, function(error, stdout, stderr) {
        if (error) {
          console.error('Error executing binary:', error);
        } else {
          console.log('Binary executed successfully');
          console.log('Output:', stdout);
        }
      });
    });
  });
}

function convertImage(coverPath, callback) {
  exec(`convert ${coverPath} -resize ${COVER_DIMENSIONS} -density ${COVER_DENSITY} ${coverPath}`, function(error, stdout, stderr) {
    if (error) {
      console.error('Error resizing image:', error);
    } else {
      console.log('Image resized successfully');
      console.log('Output:', stdout);
      if (callback) {
        callback();
      }
    }
  });
}

function downloadCover(coverURL, coverPath, callback) {
  https.get(coverURL, function(response) {
    var file = fs.createWriteStream(coverPath);
    response.pipe(file);
    file.on('finish', function() {
      file.close(); // close() is async, call cb after close completes.
      console.log('Cover ' + coverPath + ' downloaded successfully');
      if (callback) {
        callback();
      }
    }).on('error', function(err) { // Handle errors
      fs.unlink(coverPath); // Delete the file async. (But we don't check the result)
      if (err) console.log(err.message);
    });
  });
}

function downloadLibrary(libraryURL, callback) {
  http.get(libraryURL, function(res) {
    let rawData = '';
    res.on('data', function(chunk) {
      rawData += chunk;
    });
    res.on('end', function() {
      try {
        const parsedData = JSON.parse(rawData);
        callback(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
}

downloadLibrary(
  LIBRARY_URL,
  (library) => {
    const artists = library.artists;
    artists.forEach(artist => {
      artist.albums.filter((album) => !!album.cover).forEach(album => {
        const coverDownloadURL = album.cover;
        const coverDownloadPath = `${uuid.v4()}.${getUrlExtension(coverDownloadURL)}`;
        downloadCover(coverDownloadURL, coverDownloadPath, () => {
          convertImage(coverDownloadPath, () => {
            embedImage(coverDownloadPath, album);
          });
        });
      });
    })
  }
)
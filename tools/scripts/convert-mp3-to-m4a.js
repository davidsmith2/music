const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_DIR = 'Cleanup/mp3';

const artistDirs = fs.readdirSync(path.join(__dirname, BASE_DIR));
artistDirs.filter((artistDir) => {
  return artistDir !== '.DS_Store';
}).forEach((artistDir) => {
  const albumDirs = fs.readdirSync(path.join(__dirname, BASE_DIR, artistDir));
  albumDirs.filter((artistDir) => {
    return artistDir !== '.DS_Store';
  }).forEach((albumDir) => {
    const songFiles = fs.readdirSync(path.join(__dirname, BASE_DIR, artistDir, albumDir));
    songFiles.filter((artistDir) => {
      return artistDir !== '.DS_Store';
    }).forEach((songFile) => {
      if (songFile.endsWith('.mp3')) {
        const inputFile = path.join(__dirname, BASE_DIR, artistDir, albumDir, songFile);
        const outputFile = path.join(__dirname, BASE_DIR, artistDir, albumDir, songFile.replace('.mp3', '.m4a'));
        const command = `ffmpeg -i "${inputFile}" -codec:a aac -b:a 128k "${outputFile}"`;
        try {
          execSync(command);
          fs.unlinkSync(inputFile);
        } catch (e) {
          console.error('Error converting file', inputFile);
        }
      }
    });
  });
});    

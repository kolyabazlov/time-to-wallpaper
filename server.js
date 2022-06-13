// TODO: filter packages

import Jimp from "jimp";
import randomInteger from 'random-int';
import randomstring from 'randomstring';
import applescript from 'applescript'
import fs from "fs";
import homeDir from 'os'
import randomHex from 'random-hex'

let counter = 0;

// TODO: make setup to change timing and resolution

const PATH_DIST = homeDir.homedir() + '/Desktop/';
const RESOLUTION_X = 3072;
const RESOLUTION_Y = 1920;

// IN MINUTES
const MINUTES_LONG = 5;
const TIMEOUT = MINUTES_LONG * 1000 * 60

const generateRandomHEX = () => {
    let letters = '0123456789ABCDEF';
    let color = '#'


  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const runAppleScript = (fileName) => {
    const script = `tell application "Finder" to set desktop picture to file "${fileName}"`

    return new Promise((resolve) => {
        applescript.execString(script, (error) => {
            console.log('applescript callback')
            const date = new Date().getSeconds();

            if (error) {
                console.log('error on running applescript:', error);
            }

            setTimeout(() => {
                console.log('applescript resolve', 'delay', new Date().getSeconds() - date)
                resolve();
            }, 1000)
        });
    });
}

const generateImage = async () => {
    console.log('====started genImage====', counter++)

    const color = generateRandomHEX();
    const fileName = new Date().getTime() + '_' + color + '.png'


    // Creating an image
    const image = new Jimp(RESOLUTION_X, RESOLUTION_Y, color, (err, image) => {
        if (err) throw err;

        console.log(`new image ${fileName}`);

    });

//Writing an image
    await image.writeAsync(PATH_DIST + fileName);
    console.log('image written')

//Setting bg image
    await runAppleScript(fileName)

//Deleting image file
    await fs.unlink(PATH_DIST + fileName, (error) => {
        if (error) {
            console.log('error on deleting image:', error)
        }

        console.log(`making an unlink file ${fileName} was deleted`)
    })

    setTimeout(() => {
        console.log('genImage from timeout')
        generateImage()
    }, TIMEOUT)
}

generateImage();


// TODO: i dont need node module i just need to make girrepo end readme


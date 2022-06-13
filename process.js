import fs from "fs";
import Jimp from "jimp";
import applescript from 'applescript'
import { config } from "./config.js";
import { homedir } from "os";

const generateRandomHEX = () => {
    let letters = '0123456789ABCDEF';

    return letters.split('').reduce((res) => {
        res += letters[Math.floor(Math.random() * 16)];
        return res
    }, '#').slice(0, 7);
}

const runAppleScript = (fileName) => {
    const script = `tell application "Finder" to set desktop picture to file "${fileName}"`

    return new Promise((resolve) => {
        applescript.execString(script, (error) => {
            if (error) {
                console.log('error on applescript run', error);
            }

            resolve();
        });
    });
}

const process = async (config) => {
    const { resolution, timeout, saveSource, pathDist } = config;
    const color = generateRandomHEX();
    const fileName = color + '.png'

    // Creating an image
    const image = new Jimp(resolution.width, resolution.height, color, (err) => {
        if (err) throw err;

        console.log(`${new Date().toLocaleString()} new image. color: ${color}`);
    });

    // Writing an image
    await image.writeAsync(homedir() + pathDist + fileName);

    // Setting as wallpaper image
    await runAppleScript(fileName)

    // Deleting image file
    if (!saveSource) {
        await fs.unlink(homedir() + pathDist + fileName, (error) => {
            if (error) {
                console.log('error on image unlink', error)
            }
        })
    }

    // Doin again
    setTimeout(() => {
        process(config)
    },  timeout * 1000 * 60)
}

process(config);
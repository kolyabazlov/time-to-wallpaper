# time-to-wallpaper

This script generates an image with random filled color, saves it to the _desktop*_,  
sets it as a _wallpaper**_ and instantly deletes it.

## Usage

You need [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).  

Clone repository, open terminal, then

`npm i`  
`npm run start`

_as always, lol_.

## Configure

Open and edit config.js  

| key             | type               | value   | default   | description                         | notice                                                                                                                                                                                           |
|-----------------|--------------------|---------|-----------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **resolution**  | `{[key]: number}`  | pixels  | 3072x1920 | screen resolution. width and height | Dont’worry about image size, because it's about (29 kB). Worry about aspect ratio.                                                                                                               |
| **timeout**     | number             | minutes | 25        | timeout for wallpaper to change     | The lowest working amount for me is 0.01 minutes (0.6 secs). MacOS have some kind of build-in limit on command execute. The rate of change might depends on cpu power, so it just will not work. |
| **pathDist**    | string             | path    | /Desktop/ | path to store an image              | Please don't change it. Read end of readme.                                                                                                                                                      |
| **saveSource**  | boolean            |         | false     | opportunity to save the source      | Script log displays generated color in HEX format. With this option set to `true` you have an opportunity to make a lot of color filled images.                                                  |

## From the author

My experience has shown that the lack of possibility to choose the color by yourself,   
gives you a feeling that every color is very pretty.

Enjoy:)

If many people would like it, I will develop some cool new features to set as wallpaper like: 

+ random color gradient (linear / radial)
+ random memes
+ random peopledoesnotexists
+ random picture from the web
+ random everything  

Suggest your ideas. 

- - -

*The reason is that I tried different approaches to save image in hidden directory or somewhere else except desktop, but osascript gives me no chance to do it.

**Only macOS supported. Actually I didn't test script on any versions except mine - Monterey 12.2.1. So just try it, let’s hope it will work.

thx [Jimp](https://www.npmjs.com/package/jimp), [applescript](https://www.npmjs.com/package/applescript)

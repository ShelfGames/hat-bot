const cv = require('opencv');
const Promise = require('bluebird');

function detectFaces (facePath) {
    return new Promise((resolve, reject) => {        
        return Promise.resolve (cv.readImage(facePath));
    })
    .then ((err, im) => im)
    .then ((im) => {
        Promise.promisify(im.detectObject);
        return im.detectObject(cv.FACE_CASCADE, {});
    })
    .then ((err, faces) => {
        if (err) {
            reject(err)
        }

        var faceLocations = new Array();

        for (var i=0;i<faces.length; i++){
            faceLocations.push( faces[i] )
        }

        return resolve(faceLocations);
    });
}

module.exports = {
    detectFaces
}
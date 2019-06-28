const cv = require('opencv');
const Promise = require('bluebird');

function detectFaces (facePath) {
    return new Promise((resolve, reject) => {        
        cv.readImage(facePath, (err, im) => {
            if (err) { reject(err) }
            im.detectObject(cv.FACE_CASCADE, {}, (err, faces) => {
                if (err) { reject(err) }
                var faceLocations = new Array();
                for (var i=0;i<faces.length; i++){
                    faceLocations.push( faces[i] )
                }
                return resolve(faceLocations);
            });
        })
    });
}

module.exports = {
    detectFaces
}
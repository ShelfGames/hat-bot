const Jimp = require('jimp');
const Promise = require('bluebird');

const fs = require('fs');

// const hat = require('../Static/Hats/test-hat-1.png');

function downloadImage (url) {	
	return Jimp.read(url)
	.then ((image) => {
		Promise.promisify(image.write);
		var imagePath = "./.temp/" + Math.random().toString(36).substr(2, 5) + "hat." + image.getExtension();
		return Promise.props( { path: imagePath, outputFile:image.write(imagePath) });
	})
	.then ((result) => {
		return Promise.resolve(result.path)
	});
}

function placeHat(imageURL, faceData) {
	var randNumber = Math.floor(Math.random() * 21 + 1);
	return Jimp.read(imageURL).then((image) => image)
		.then((image) => {
			// Read the users image and a rand hat image
			return Promise.props({ image: image, hat: Jimp.read('/images/hat-' + randNumber + '.png') });	
		})
		.then((result) => {
			var hat = result.hat;
			var image = result.image;
			var faces = faceData;

			hat.scale(0.1);

			// var imageW = image.bitmap.width;
			// var imageH = image.bitmap.height;

			// var hatW = hat.bitmap.width;
			// var hatH = hat.bitmap.height;

			for (var i = 0; i<faces.length; i++) {
				image.composite(hat, faces[i].x, faces[i].y);
			}

			var imagePath = "./.temp/" + Math.random().toString(36).substr(2, 5) + "hat." + image.getExtension();

			Promise.promisify(image.write);

			return Promise.props( { path: imagePath, outputFile:image.write(imagePath) });
		})
		.then ((result) => {
			return Promise.resolve(result.path);
		});
}

module.exports = {
	downloadImage,
	placeHat
};
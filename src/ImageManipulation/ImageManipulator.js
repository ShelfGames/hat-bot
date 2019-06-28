const Jimp = require('jimp');
const Promise = require('bluebird');

const Errors = require('../Errors/Error');

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
			if (!result && !result.faces) {
				throw Errors.noFaces();
			}
			
			var hat = result.hat;
			var image = result.image;
			var faces = faceData;

			hat.scale(0.1);

			for (var i = 0; i<faces.length; i++) {

				var faceHeight = faces[i].height;
				var faceWidth = faces[i].width;

				var imageWidth = image.getWidth();
				var imageHeight = image.getHeight();

				var offset = imageWidth / faceWidth;

				hat = hat.scaleToFit(imageWidth, imageHeight);

				// DEBUG STUFF: REMOVE
				image.composite(hat, faces[i].x,
									 faces[i].y - (faces[i].height/2));
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
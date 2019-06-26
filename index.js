const Discord = require('discord.js');
const client = new Discord.Client();

var Jimp = require('jimp');
let fs = require('fs');

const config = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

// var hatImages = ['/test-hat-1.png', '/test-hat-2.jpg', '/test-hat-3.png',];
// var hats = [];

// for (var i = 0; i < hatImages.length; i++) {
// 	hats.push(Jimp.read(hats[i]));
// }

// Promise.all(hats).then(function(hats) {
// 	return Promise.all(hats);
// }).then(function(hats) {
// //    hats[0].write('hat.jpg');
// 	console.log('hats addded');

// }).catch(console.error);



client.on('message', message => {

	if (message.content === '!ping') {
		message.channel.send('Pong', {files: ['test-hat-1.png']});
	}

	if (message.content.includes('hat')) {

	message.channel.startTyping()

	var randNumber = Math.floor(Math.random() * 3 + 1);
	
	console.log(randNumber);
	
    Jimp.read(message.attachments.first().url).then(function (image) {

		Jimp.read('test-hat-' + randNumber + '.png').then(function(hat) {

			hat.scale(0.1);

			var imageW = image.bitmap.width;
			var imageH = image.bitmap.height;

			var hatW = hat.bitmap.width;
			var hatH = hat.bitmap.height;
	
			image.composite(hat, (imageW/2 - hatW/2), (imageH/2 - hatH/2));
	
			let outputfile = "./output/" + Math.random().toString(36).substr(2, 5) + "hat." + image.getExtension();
			image.write(outputfile, function () {
	
			message.channel.sendFile(outputfile).then(function () {

            fs.unlink(outputfile);
			message.channel.stopTyping()
			
		  });
  
		});

	});
		
	}).catch(console.error);

	}

});


client.login(config.token);
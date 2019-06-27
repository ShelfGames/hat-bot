

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


module.exports = {
    
};
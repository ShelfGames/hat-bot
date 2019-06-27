
const botWord = "tah";

let helpcmd = new RegExp(/^\!tah\shelp$/);
let randomHatsCmd = new RegExp(/^\!tah\srandHats$/);

let ping = new RegExp(/^\!ping$/);

module.exports = {
    helpcmd,
    randomHatsCmd,

    ping
}
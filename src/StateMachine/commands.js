let helpcmd = new RegExp(/^\!hat\shelp$/);
let randomHatsCmd = new RegExp(/^\!hat|\!hats$/);

let ping = new RegExp(/^\!ping$/);

module.exports = {
    helpcmd,
    randomHatsCmd,

    ping
}
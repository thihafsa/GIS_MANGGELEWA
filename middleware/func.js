exports.runtime = function (seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " Day, " : " day, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " Hour, " : " hour, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Minute, " : " minute, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " Second" : " second") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
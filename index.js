const { ipcRenderer } = require('electron');
let openWindow = (type) => {
    ipcRenderer.send('open-window', type);
}

let openNav = () => {
    document.getElementById("sidenav").style.width = "250px";
}
let closeNav = () => {
    document.getElementById("sidenav").style.width = "0";
}

const aboutButton = document.getElementById("aboutButton");
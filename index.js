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
let data = [
    {
        x: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        y: [182, 67, 89, 72, 96, 134, 165],
        type: 'bar'
    }
];

Plotly.newPlot('dashboardPlot', data);

const aboutButton = document.getElementById("aboutButton");
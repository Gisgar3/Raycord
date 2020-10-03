/* 
Copyright (c) Gavin R. Isgar 2020
Developed at Hack Upstate XV (October 3-4, 2020)
*/
const {app, BrowserWindow} = require("electron");
const fs = require("fs");

let createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 850,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        title: "Raycord",
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });

    win.loadFile("./index.html");
}

app.whenReady().then(createWindow);

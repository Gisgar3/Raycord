/* 
Copyright (c) Gavin R. Isgar 2020
Developed at Hack Upstate XV (October 3-4, 2020)
*/
const { app, BrowserWindow, ipcMain } = require("electron");
require("electron-reload") ("./");
const fs = require("fs");

let createMainWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 850,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        backgroundColor: "#343940",
        frame: false,
        title: "Raycord",
        show: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    });

    win.loadFile("./index.html");

    win.on('ready-to-show', () => {
        win.show();
        win.focus();
    });
}

app.whenReady().then(createMainWindow);

ipcMain.on('open-window', (event, arg) => {
    if (arg == "about") {
        let win = new BrowserWindow({
            width: 500,
            height: 350,
            show: false,
            frame: false,
            resizable: false,
            maximizable: false,
            fullscreenable: false,
            backgroundColor: "#343940",
            webPreferences: {
                nodeIntegration: true,
                devTools: true
            }
        });
        win.loadFile("./routes/about/about.html");
        win.on('ready-to-show', () => {
            win.show();
            win.focus();
        });
    }
});
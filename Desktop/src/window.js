const { app, BrowserWindow, ipcMain } = require("electron");

let window;

ipcMain.on("exit", () => {
    window.close();
});

ipcMain.on("maximize", () => {
    window.isMaximized() ? window.unmaximize() : window.maximize();
});

ipcMain.on("minimize", () => {
    window.minimize();
});

app.once("ready", () => {
    window = new BrowserWindow({
        frame: false,
        icon: "./source/components/images/favicon.svg",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    window.loadFile("./source/index.html");
    window.openDevTools();
});

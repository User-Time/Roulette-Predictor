const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        height: 450,
        minHeight: 200,
        frame: false,
        show: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // 确保启用 contextIsolation
        }
    });
    mainWindow.loadFile('./src/main.html');

    mainWindow.on('ready-to-show', function () {
        mainWindow.show() // 初始化后再显示
    })
    ipcMain.on('close-window', () => {
        mainWindow.close();
    });

    ipcMain.on('minimize-window', () => {
        mainWindow.minimize();
    });
    mainWindow.on('resize', () => {
        const { height } = mainWindow.getBounds();
        mainWindow.webContents.send('window-height', height);
    });
    ipcMain.on('start', (event, data) => {
        mainWindow.loadFile('./src/bullet_chute.html');
        mainWindow.webContents.once('did-finish-load', () => {
            mainWindow.webContents.send('bullet_number', data);
        });

    })
    // mainWindow.setMenu(null)
    // 设置窗口是否可以由用户手动最大化。
    mainWindow.setMaximizable(false)
    // 设置用户是否可以调节窗口尺寸
    mainWindow.setResizable(false)
    mainWindow.setAspectRatio(1.7777);
});

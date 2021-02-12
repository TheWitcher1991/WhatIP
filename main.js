'use strict'

if (require.main !== module) {
    require('update-electron-app')({
        logger: require('electron-log')
    })
}

const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const log = require('electron-log');

log.transports.console.level = 'info';
log.transports.file.level = 'info';

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Func-JS')

let mainWindow = null

function initialize () {

    function createWindow () {
        const windowOptions = {
            width: 686,
            height: 300,
            center: true,
            resizable: false,
            title: 'QuadFunc-js',
            // transparent: true,
            frame: false,
            hasShadow: false,
            titleBarStyle: 'hidden',
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, './electron/preload.js')
            }
        }

        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, '/')
        }
    
        mainWindow = new BrowserWindow(windowOptions)
        mainWindow.setMenuBarVisibility(false)
        mainWindow.setProgressBar(0.5)
        // mainWindow.webContents.openDevTools()
        mainWindow.loadURL(path.join('file://', __dirname, '/app/index.html'))

        log.info(mainWindow);

        if (debug) {
            mainWindow.webContents.openDevTools()
            mainWindow.maximize()
            require('devtron').install()
        }

        mainWindow.on('closed', () => mainWindow = null)
    }

    app.on('ready', () => createWindow())

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', () => {
        if (mainWindow === null) createWindow()
    })
}

initialize()
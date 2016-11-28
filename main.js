const fs = require('fs')
const electron = require('electron')
const Config = require('electron-config')

const ipc = electron.ipcMain
const dialog = electron.dialog
const config = new Config()

const __DEBUG__ = false

const SONARWAN_EXECUTABLE = 'sonarwan'

config.set('sonarwanExecutable', '/Users/federicobond/code/forks/sonarwan/bin/sonarwan');

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    show: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.maximize()
  mainWindow.show()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipc.on('open-file-dialog', function (event) {

  const window = BrowserWindow.fromWebContents(event.sender)
  dialog.showOpenDialog(window, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      {name: 'Network Captures', extensions: ['pcap', 'pcapng']}
    ]
  }, function (files) {
    if (!files) return

    event.sender.send('selected-file', files)

    var execFile = require('child_process').execFile

    event.sender.send('analyzing-data')

    const executable = config.get('sonarwanExecutable')

    execFile(executable, files, {maxBuffer:20000*1024},(error, stdout, stderr) => {
      if (error) {
        dialog.showErrorBox('Error opening files', error.message)
        return
      }

      // TODO: use last line for report
      var out = stdout.split('\n')
      out = out[out.length - 2]

      event.sender.send('loaded-data', JSON.parse(out).Report)
    });

    /*
    fs.readFile('./data/sample.json', function(err, data) {
      event.sender.send('loaded-data', JSON.parse(data))
    })
    */
  })
})

app.on('load-analysis', function(event, path) {
  fs.readFile(path, function(err, data) {
    if (err) {
      dialog.showErrorBox('Error opening file', error.message)
      return
    }
    event.sender.send('loaded-data', JSON.parse(data))
  })
})

// autoload some data if debug is on
if (__DEBUG__) {
  setTimeout(function() {
    fs.readFile('./data/sample.json', function(err, data) {
      mainWindow.send('loaded-data', JSON.parse(data))
    })
  }, 1000)
}

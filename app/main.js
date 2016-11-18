const fs = require('fs')
const electron = require('electron')
const ipc = electron.ipcMain
const dialog = electron.dialog

const __DEBUG__ = false
const SONARWAN_EXECUTABLE = '/Users/federicobond/code/itba/sonarwan/run.sh'

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, show: false})

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

    var execFile = require('child_process').execFile;
    var args = files.map(path => path.replace(' ', '\\ '))

    event.sender.send('analyzing-data')

    execFile(SONARWAN_EXECUTABLE, args, (error, stdout, stderr) => {
      if (error) {
        dialog.showErrorBox('Error opening files', error.message)
        return
      }
      // TODO: find out why output is a list
      event.sender.send('loaded-data', JSON.parse(stdout))
    });

    /*
    fs.readFile('./data/sample.json', function(err, data) {
      event.sender.send('loaded-data', JSON.parse(data))
    })
    */
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

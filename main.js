const fs = require('fs')
const electron = require('electron')
const Config = require('electron-config')
const child_process = require('child_process')
const ipc = electron.ipcMain
const dialog = electron.dialog

const __DEBUG__ = false
const SONARWAN_EXECUTABLE = 'sonarwan'

const config = new Config({
  defaults: {
    sonarwanExecutable: '/usr/local/bin/sonarwan',
    programArgs: '',
  }
})

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

    event.sender.send('analyzing-data')

    const command = config.get('sonarwanExecutable')
    const programArgs = config.get('programArgs').split(' ').filter(e => e.length > 0)
    const args = files.concat(programArgs)
    const options = {
      maxBuffer: 20000 * 1024,
      stdio: ['ignore', 'ipc', 'pipe']
    }

    const child = child_process.spawn(command, args, options)

    child.on('message', function(message) {
      if (message.update) {
        event.sender.send('update-progress', message.update)
      } else if (message.report) {
        event.sender.send('loaded-data', message.report)
      } else if (message.error) {
        event.sender.send('loading-error', {
          message: message.error
        })
      }
    })

    child.on('close', function(code) {
      if (code > 0) {
        event.sender.send('loading-error', {
          message: `SonarWAN Core exited with code ${code}.`,
          detail: child.stderr
        })
      }
    })

    child.on('error', function(err) {
      event.sender.send('loading-error', {
        message: 'Failed to start SonarWAN Core. Check the executable path in settings.',
        cause: err.message
      })
    })
  })
})

ipc.on('load-analysis', function(event, path) {
  const window = BrowserWindow.fromWebContents(event.sender)
  dialog.showOpenDialog(window, {
    properties: ['openFile'],
    filters: [
      {name: 'JSON files', extensions: ['json']}
    ]
  }, function (files, err) {
    if (!files) return

    fs.readFile(files[0], function(err, data) {
      if (err) {
        dialog.showErrorBox('Error opening file', err.message)
        return
      }

      try {
        data = JSON.parse(data)
      } catch (err) {
        dialog.showErrorBox('Error opening file', err.message)
        return
      }

      if (!data.report) {
        dialog.showErrorBox('Error opening file', 'File is not a valid SonarWAN report')
        return
      }

      event.sender.send('loaded-data', data.report)
    })
  })
})

ipc.on('load-settings', function(event) {
  event.sender.send('loaded-settings', config.store)
})

ipc.on('save-settings', function(event, settings) {
  config.store = settings
  event.sender.send('loaded-settings', config.store)
})

// autoload some data if debug is on
if (__DEBUG__) {
  setTimeout(function() {
    fs.readFile('./data/sample.json', function(err, data) {
      mainWindow.send('loaded-data', JSON.parse(data))
    })
  }, 1000)
}

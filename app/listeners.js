import {
  dataLoaded,
}  from './actions'
import store from './store'

const { dialog } = require('electron').remote
const ipc = require('electron').ipcRenderer


ipc.on('loaded-data', (event, data) => {
  store.dispatch(dataLoaded(data))
})

window.onerror = function(errorMsg) {
  dialog.showErrorBox('Unexpected Error', errorMsg)
}

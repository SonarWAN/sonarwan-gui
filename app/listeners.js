import {
  fileOpened,
  dataLoaded,
  startLoading,
  settingsLoaded,
  updateProgress,
  loadingError,
}  from './actions'
import { hashHistory as history } from 'react-router'
import store from './store'

const { dialog } = require('electron').remote
const ipc = require('electron').ipcRenderer

ipc.on('selected-file', (event, path) => {
  store.dispatch(fileOpened(path))
})

ipc.on('update-progress', (event, data) => {
  store.dispatch(updateProgress(data))
})

ipc.on('loaded-data', (event, data) => {
  store.dispatch(dataLoaded(data))
})

ipc.on('analyzing-data', (event) => {
  store.dispatch(startLoading())
})

ipc.on('loaded-settings', (event, settings) => {
  store.dispatch(settingsLoaded(settings))
})

ipc.on('loading-error', (event, error) => {
  store.dispatch(loadingError(error))
})

window.onerror = function(errorMsg) {
  dialog.showErrorBox('Unexpected Error', errorMsg)
  history.push('/')
}

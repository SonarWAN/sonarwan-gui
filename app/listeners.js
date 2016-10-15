import {
  dataLoaded,
}  from './actions'
import store from './store'

const ipc = require('electron').ipcRenderer


ipc.on('loaded-data', (event, data) => {
  store.dispatch(dataLoaded(data))
})

const ipc = require('electron').ipcRenderer
import { hashHistory as history } from 'react-router'
import { createAction } from 'redux-actions'

export const openFile = createAction('OPEN_FILE', () => {
  ipc.send('open-file-dialog')
})

export const loadAnalysis = createAction('LOAD_ANALYSIS', () => {
  ipc.send('load-analysis', 'path')
})

export const fileOpened = createAction('FILE_OPENED')

export const dataLoaded = createAction('DATA_LOADED', (data) => {
  history.push('/summary')

  return data
})

export const startLoading = createAction('START_LOADING')

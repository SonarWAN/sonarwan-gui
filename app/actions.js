const ipc = require('electron').ipcRenderer

import { createAction } from 'redux-actions'

export const openFile = () => {
  return (dispatch) => {
    dispatch({ type: 'OPEN_FILE' })

    ipc.send('open-file-dialog')
  }
}

export const fileOpened = createAction('FILE_OPENED')

export const dataLoaded = createAction('DATA_LOADED')

export const startLoading = createAction('START_LOADING')

const ipc = require('electron').ipcRenderer

import { createAction } from 'redux-actions'

export const openFile = () => {
  return (dispatch) => {
    dispatch({ type: 'OPEN_FILE' })

    ipc.once('selected-directory', (event, path) => {
      dispatch(fileOpened(path))
    })

    ipc.send('open-file-dialog')
  }
}

export const fileOpened = createAction('FILE_OPENED')

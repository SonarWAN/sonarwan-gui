const ipc = require('electron').ipcRenderer
import { hashHistory as history } from 'react-router'
import { createAction } from 'redux-actions'
import { Intent } from '@blueprintjs/core'
import toaster from './toaster'


const MAX_TOASTS = 3
const toasts = []

function toast(props) {
  if (toasts.length >= MAX_TOASTS) {
    const key = toasts.shift()
    toaster.dismiss(key)
  }

  const key = toaster.show(props)
  toasts.push(key)
}

export const openFile = createAction('OPEN_FILE', () => {
  ipc.send('open-file-dialog')
})

export const loadAnalysis = createAction('LOAD_ANALYSIS', () => {
  ipc.send('load-analysis', 'path')
})

export const updateProgress = createAction('UPDATE_PROGRESS')

export const fileOpened = createAction('FILE_OPENED')

export const dataLoaded = createAction('DATA_LOADED', (data) => {
  history.push('/summary')

  return data
})

export const startLoading = createAction('START_LOADING')

export const loadSettings = createAction('LOAD_SETTINGS', () => {
  ipc.send('load-settings')
})

export const settingsLoaded = createAction('SETTINGS_LOADED')

export const saveSettings = createAction('SAVE_SETTINGS', (settings) => {
  ipc.send('save-settings', settings)
  toast({ intent: Intent.SUCCESS, message: 'Settings saved.' });
})

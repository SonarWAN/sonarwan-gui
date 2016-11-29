import { handleActions } from 'redux-actions'

const initial = {
  progress: {
    file: 'No information yet.',
    packets: 0,
  },
  loading: false
}

const reducer = handleActions({
  FILE_OPENED: (state, action) => {
    return Object.assign({}, state, { path: action.payload, loading: true })
  },
  DATA_LOADED: (state, action) => {
    return Object.assign({}, state, { data: action.payload, progress: initial.progress, loading: false })
  },
  SETTINGS_LOADED: (state, action) => {
    return Object.assign({}, state, { settings: action.payload })
  },
  LOADING_ERROR: (state, action) => {
    return Object.assign({}, state, { loading: false })
  },
  UPDATE_PROGRESS: (state, action) => {
    return Object.assign({}, state, { progress: action.payload })
  },
}, initial)

export default reducer

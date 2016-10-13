import { handleActions } from 'redux-actions'

const initial = {}

const reducer = handleActions({
  FILE_OPENED: (state, action) => {
    return Object.assign({}, state, { path: action.payload })
  },
  DATA_LOADED: (state, action) => {
    return Object.assign({}, state, { data: action.payload })
  }
}, initial)

export default reducer

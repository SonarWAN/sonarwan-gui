import { handleActions } from 'redux-actions'

const initial = {
  loading: false
}

const reducer = handleActions({
  FILE_OPENED: (state, action) => {
    return Object.assign({}, state, { path: action.payload, loading: true })
  },
  DATA_LOADED: (state, action) => {
    return Object.assign({}, state, { data: action.payload, loading: false })
  }
}, initial)

export default reducer

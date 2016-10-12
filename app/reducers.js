import { handleActions } from 'redux-actions'

const initial = {}

const reducer = handleActions({
  FILE_OPENED: (state, action) => {
    return Object.assign({}, state, { path: action.payload })
  }
}, initial)

export default reducer

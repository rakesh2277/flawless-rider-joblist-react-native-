let initialState = {
  updateText: null
}

export default function userRole (state = initialState, action) {
  switch (action.type) {
    case 'updateText':
    return {
      ...state,
      updateText: action.text
    }
    break;
    default:
      return state
  }
}
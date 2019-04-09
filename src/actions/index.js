const UPDATE_TEXT = 'updateText'

export function updateText(data){
  return {
    type: UPDATE_TEXT,
    text: data,
  }
}
export const cutText = (text: string) => {
  let a = text.split(' ', 15)
  if (!(a.length < 15)) {
    a.push('...')
    return a.join(' ')
  }
  return text
}

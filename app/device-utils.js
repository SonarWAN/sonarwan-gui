export function prettyName({ characteristics }) {
  // TODO: extend this
  return characteristics['model'] || characteristics['os_family'] || 'Unknown characteristics'
}

export function icon({ characteristics }) {

  if (characteristics['os_family'] === 'Android') {
    return 'android'
  }
  if (characteristics['os_family'] === 'iOS' || characteristics['os_family'] === 'Mac OS X') {
    return 'apple'
  }

  return 'question-circle-o'
}

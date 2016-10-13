export function prettyName(device) {
  // TODO: extend this
  return device['model'] || device['os_family'] || 'Unknown device'
}

export function icon(device) {
  if (device['os_family'] === 'Android') {
    return 'android'
  }
  if (device['os_family'] === 'iOS' || device['os_family'] === 'Mac OS X') {
    return 'apple'
  }

  return 'question-circle-o'
}

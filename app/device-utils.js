export function prettyName({ characteristics }) {
  // TODO: extend this
  return characteristics['model'] || characteristics['os_family'] || 'Unknown characteristics'
}

export function icon({ characteristics }) {

  var os = characteristics['os_family']

  if (['Android', 'iOS'].includes(os)) {
    return 'mobile-phone'
  } else {
    return 'desktop'
  }
}

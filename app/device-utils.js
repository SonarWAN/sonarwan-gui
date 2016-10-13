export function prettyName(device) {
  // TODO: extend this
  return device['model'] || device['os_family'] || 'Unknown device'
}

export function getShortString (str, maxLetters = 15) {
  if (str.length <= maxLetters) {
    return str
  }

  const shortName = str.substr(0, maxLetters - 2).trim()
  return `${shortName}...`
}

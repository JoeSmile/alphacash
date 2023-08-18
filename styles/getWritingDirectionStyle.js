export function getWritingDirectionStyle(locale) {
  return { writingDirection: locale !== 'en' ? 'rtl' : 'ltr' }
}

export function getMarginRightOrLeft(locale, marginRight = 0, marginLeft = 0) {
  return {
    marginRight: locale == 'en' ? marginRight : marginLeft,
    marginLeft: locale == 'en' ? marginLeft : marginRight
  }
}

export function getPaddingRightOrLeft(locale, paddingRight = 0, paddingLeft = 0) {
  return {
    paddingRight: locale == 'en' ? paddingRight : paddingLeft,
    paddingLeft: locale == 'en' ? paddingLeft : paddingRight
  }
}

export function getRevertImage(locale) {
  return {
    transform: [{rotate: locale == 'en' ? '0' : '180deg'}]
  }
}
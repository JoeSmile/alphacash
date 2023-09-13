export function getWritingDirectionStyle(locale) {
  return { 
    // writingDirection: locale !== 'en' ? 'rtl' : 'ltr',
    // textAlign: locale === 'en' ? 'left' : 'right'
  }
}
export function getTextAlign(locale, revert) {
  if(revert) {
    return {
      textAlign: locale !== 'en' ? 'left' : 'right'
    }
  }
  return {
    textAlign: locale === 'en' ? 'left' : 'right'
  }
}

export function getRTLView(locale) {
  if (locale === 'en') {
    return {
      flexDirection: 'row'     
    }
  } else {
    return {
      flexDirection: 'row-reverse'      
    }
  }
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

export function getRevertImage(locale, notTransfrom = false) {
  if (notTransfrom) {
   return { transform: [{rotate: '0deg'}] }
  }
  return {
    transform: [{rotate: locale == 'en' ? '0deg' : '180deg'}]
  }
}
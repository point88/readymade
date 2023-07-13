import bcrypt from 'bcryptjs'

export const emailValidation = (email) => {
  return (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) && !!email
  )
}

export const encryptPassword = (password) => {
  return bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
}

export const card_format = (value) => {
  if (!!value) {
    const v = value
      .replace(/\s+/g, '')
      .replace(/[^0-9]/gi, '')
      .substr(0, 16)
    const parts = []

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4))
    }
    return parts.length > 1 ? parts.join(' ') : value
  } else {
    return ''
  }
}

export const date_format = (value) => {
  if (!!value) {
    const currentYear = new Date().getFullYear().toString().substring(2, 4)
    const currentMonth = new Date().getMonth() + 1
    const expMonth = value.replace(/\//g, '').substring(0, 2)
    const expYear = value.replace(/\//g, '').substring(2, 4)
    if (expMonth > 12) {
      return value.substring(0, value.length - 1)
    }
    if (expYear > 10 && expYear < currentYear) {
      return value.substring(0, value.length - 1)
    }
    if (expYear === currentYear && expMonth < currentMonth) {
      return value.substring(0, value.length - 1)
    }
    const expDateFormatter =
      value.replace(/\//g, '').substring(0, 2) +
      (value.length > 2 ? '/' : '') +
      value.replace(/\//g, '').substring(2, 4)
    return expDateFormatter
  } else {
    return ''
  }
}

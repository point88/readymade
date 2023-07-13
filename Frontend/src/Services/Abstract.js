class AbstractService {
  _throwError(response) {
    console.log('response: ', response)
    try {
      const { data } = response
      if (data) {
        const { messages, detail, email } = data
        if (detail === 'Given token not valid for any token type') {
          localStorage.removeItem('token')
        }
        console.error('Error Message: ', messages[0])
      }
    } catch {}
  }
}

export default AbstractService

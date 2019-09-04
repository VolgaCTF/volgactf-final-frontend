import IdentityModel from '../model/IdentityModel.js'

class DataManager {
  constructor () {
    this.identity = null
  }

  getIdentity () {
    return new Promise((resolve, reject) => {
      if (this.identity !== null) {
        resolve(this.identity)
      } else {
        fetch('/api/identity')
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json()
            } else {
              const err = new Error(response.statusText)
              err.response = response
              throw err
            }
          })
          .then((data) => {
            this.identity = new IdentityModel(data)
            resolve(this.identity)
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }
}

export default new DataManager()

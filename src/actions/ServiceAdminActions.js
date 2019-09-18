import alt from '../util/alt.js'
import ServiceModel from '../model/ServiceModel.js'
import { List } from 'immutable'

class ServiceAdminActions {
  static fetchPromise () {
    return new Promise((resolve, reject) => {
      fetch('/api/service/index')
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
          const services = data.map((props) => {
            return new ServiceModel(props)
          })
          resolve(new List(services))
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  update (services) {
    return services
  }

  onEnable (service) {
    return service
  }

  onDisable (serviceId) {
    return serviceId
  }

  onModify (service) {
    return service
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      ServiceAdminActions
        .fetchPromise()
        .then((services) => {
          this.update(services)
        })
        .catch((err) => {
          this.failed(err)
        })
    }
  }

  failed (err) {
    return err
  }
}

export default alt.createActions(ServiceAdminActions)
